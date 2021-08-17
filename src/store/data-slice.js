import { createSlice } from "@reduxjs/toolkit";

import { manageJsonRequest } from "../lib/api";

const FIREBASE_URL = "https://ms-crm-web-app-default-rtdb.firebaseio.com/";

const initialState = { leads: {}, accounts: {} };
// const stateShape = {
//   leads: {
//     leadId: {
//       interactions: { interactionId: { interactionObject } },
//       tasks: { taskId: { taskObject } },
//       notes: { noteId: { noteObject } },
//     },
//   },
//   accounts: "(same as leads)",
//   interactionTypes: {
//     id: { name: "str" },
//   },
//   industries: {
//     id: { name: "str" },
//   },
// };

export const initialCustomerState = () => ({
  latestAction: "New",
  address: "",
  website: "",
  industryId: "",
  interactions: {},
  tasks: {},
  notes: {},
});

export const initialInteractionState = {
  actionType: "interactions",
  interactionTypeId: "",
};

export const initialTaskState = {
  actionType: "tasks",
  title: "",
  description: "",
};

export const initialNoteState = {
  actionType: "notes",
  title: "",
  text: "",
};

const initialActionStates = {
  interactions: initialInteractionState,
  tasks: initialTaskState,
  notes: initialNoteState,
};

/**
 * Fill in empty/default values where backend has nothing
 */
const normalizeCustomersState = (customersState, customerType, actions) => {
  for (const customerId in customersState) {
    customersState[customerId] = {
      ...initialCustomerState(),
      ...customersState[customerId],
    };
    const customerState = customersState[customerId];
    normalizeActionsState(
      customerState,
      actions.interactions[customerType][customerId],
      "interactions"
    );
    normalizeActionsState(
      customerState,
      actions.tasks[customerType][customerId],
      "tasks"
    );
    normalizeActionsState(
      customerState,
      actions.notes[customerType][customerId],
      "notes"
    );
  }
};

const normalizeActionsState = (customerState, actionsState, actionType) => {
  const initialActionState = initialActionStates[actionType];
  for (const actionId in actionsState) {
    customerState[actionType][actionId] = {
      ...initialActionState,
      ...actionsState[actionId],
    };
  }
};

const addAction = (state, payload, actionType) => {
  const initialActionState = initialActionStates[actionType];
  const customer = state[payload.customerType][payload.customerId];
  customer[actionType][payload.actionId] = {
    ...initialActionState,
    ...payload.data,
  };
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    replaceData(state, action) {
      const { interactions, tasks, notes, ...rest } = action.payload;
      state = { ...initialState, ...rest };

      const actions = { interactions, tasks, notes };
      normalizeCustomersState(state.leads, "leads", actions);
      normalizeCustomersState(state.accounts, "accounts", actions);
      return state;
    },

    addCustomer(state, action) {
      const customers = state[action.payload.type]; // either leads or accounts
      const id = action.payload.id;
      customers[id] = { ...initialCustomerState(), ...action.payload.data };
    },
    addInteraction(state, action) {
      addAction(state, action.payload, "interactions");
    },
    addTask(state, action) {
      addAction(state, action.payload, "tasks");
    },
    addNote(state, action) {
      addAction(state, action.payload, "notes");
    },

    removeCustomer(state, action) {
      const pl = action.payload;
      delete state[pl.type][pl.id];
    },
    removeInteraction(state, action) {
      const pl = action.payload;
      delete state[pl.customerType][pl.customerId].interactions[pl.actionId];
    },
    removeTask(state, action) {
      const pl = action.payload;
      delete state[pl.customerType][pl.customerId].tasks[pl.actionId];
    },
    removeNote(state, action) {
      const pl = action.payload;
      delete state[pl.customerType][pl.customerId].notes[pl.actionId];
    },

    updateCustomer(state, action) {
      const pl = action.payload;
      const customers = state[pl.type];
      const customer = customers[pl.id];
      customers[pl.id] = { ...customer, ...pl.data };
    },
    updateInteraction(state, action) {
      const pl = action.payload;
      const { interactions } = state[pl.customerType][pl.customerId];
      interactions[pl.actionId] = { ...interactions[pl.actionId], ...pl.data };
    },
    updateTask(state, action) {
      const pl = action.payload;
      const { tasks } = state[pl.customerType][pl.customerId];
      tasks[pl.actionId] = { ...tasks[pl.actionId], ...pl.data };
    },
    updateNote(state, action) {
      const pl = action.payload;
      const { notes } = state[pl.customerType][pl.customerId];
      notes[pl.actionId] = { ...notes[pl.actionId], ...pl.data };
    },
  },
});

const loadData = () => {
  return async (dispatch) => {
    const data = await manageJsonRequest(
      {
        url: `${FIREBASE_URL}.json`,
        method: "GET",
      },
      dispatch
    );

    dispatch(dataActions.replaceData(data));
  };
};

const createCustomer = (customerType, customerData) => {
  return async (dispatch) => {
    const data = await manageJsonRequest({
      url: `${FIREBASE_URL}/${customerType}.json`,
      method: "POST",
      body: customerData,
    });

    if (data instanceof Error) {
      // notify failure
    } else {
      dispatch(
        dataActions.addCustomer({
          type: customerType,
          id: data.name,
          data: customerData,
        })
      );
    }
  };
};

const createLead = (leadData) => createCustomer("leads", leadData);
const createAccount = (accountData) => createCustomer("accounts", accountData);

const editCustomer = (customerType, customerId, customerData) => {
  return async (dispatch) => {
    const data = await manageJsonRequest({
      url: `${FIREBASE_URL}/${customerType}/${customerId}.json`,
      method: "PATCH",
      body: customerData,
    });

    if (data instanceof Error) {
      // notify failure
    } else {
      dispatch(
        dataActions.updateCustomer({
          type: customerType,
          id: customerId,
          data: customerData,
        })
      );
    }
  };
};

const editLead = (id, data) => editCustomer("leads", id, data);
const editAccount = (id, data) => editCustomer("accounts", id, data);

const deleteCustomer = (customerType, customerId) => {
  return async (dispatch) => {
    const data = await manageJsonRequest({
      url: `${FIREBASE_URL}/${customerType}/${customerId}.json`,
      method: "DELETE",
    });

    if (data instanceof Error) {
      // notify failure
    } else {
      dispatch(
        dataActions.removeCustomer({
          type: customerType,
          id: customerId,
        })
      );
      // also get rid of other relevant records from database
      manageJsonRequest({
        url: `${FIREBASE_URL}/interactions/${customerType}/${customerId}.json`,
        method: "DELETE",
      });
      manageJsonRequest({
        url: `${FIREBASE_URL}/tasks/${customerType}/${customerId}.json`,
        method: "DELETE",
      });
      manageJsonRequest({
        url: `${FIREBASE_URL}/notes/${customerType}/${customerId}.json`,
        method: "DELETE",
      });
    }
  };
};

const deleteLead = (id) => deleteCustomer("leads", id);
const deleteAccount = (id) => deleteCustomer("accounts", id);

const createAction = (
  actionData,
  customerType,
  customerId,
  actionType,
  reducer
) => {
  return async (dispatch) => {
    const data = await manageJsonRequest({
      url: `${FIREBASE_URL}/${actionType}/${customerType}/${customerId}.json`,
      method: "POST",
      body: actionData,
    });

    if (data instanceof Error) {
      // notify failure
    } else {
      dispatch(
        reducer({
          customerType,
          customerId,
          actionId: data.name,
          data: actionData,
        })
      );
    }
  };
};

const createInteraction = (data, customerType, customerId) =>
  createAction(
    data,
    customerType,
    customerId,
    "interactions",
    dataActions.addInteraction
  );

const createTask = (data, customerType, customerId) =>
  createAction(data, customerType, customerId, "tasks", dataActions.addTask);

const createNote = (data, customerType, customerId) =>
  createAction(data, customerType, customerId, "notes", dataActions.addNote);

const editAction = (
  customerType,
  customerId,
  actionType,
  actionId,
  actionData,
  reducer
) => {
  return async (dispatch) => {
    const data = await manageJsonRequest({
      url: `${FIREBASE_URL}/${actionType}/${customerType}/${customerId}/${actionId}.json`,
      method: "PATCH",
      body: actionData,
    });

    if (data instanceof Error) {
      // notify failure
    } else {
      dispatch(
        reducer({
          customerType,
          customerId,
          actionId,
          data: actionData,
        })
      );
    }
  };
};

const editInteraction = (customerType, customerId, actionId, data) =>
  editAction(
    customerType,
    customerId,
    "interactions",
    actionId,
    data,
    dataActions.updateInteraction
  );

const editTask = (customerType, customerId, actionId, data) =>
  editAction(
    customerType,
    customerId,
    "tasks",
    actionId,
    data,
    dataActions.updateTask
  );

const editNote = (customerType, customerId, actionId, data) =>
  editAction(
    customerType,
    customerId,
    "notes",
    actionId,
    data,
    dataActions.updateNote
  );

const deleteAction = (
  customerType,
  customerId,
  actionType,
  actionId,
  reducer
) => {
  return async (dispatch) => {
    const data = await manageJsonRequest({
      url: `${FIREBASE_URL}/${actionType}/${customerType}/${customerId}/${actionId}.json`,
      method: "DELETE",
    });

    if (data instanceof Error) {
      // notify failure
    } else {
      dispatch(
        reducer({
          customerType,
          customerId,
          actionId,
        })
      );
    }
  };
};

const deleteInteraction = (customerType, customerId, actionId) =>
  deleteAction(
    customerType,
    customerId,
    "interactions",
    actionId,
    dataActions.removeInteraction
  );

const deleteTask = (customerType, customerId, actionId) =>
  deleteAction(
    customerType,
    customerId,
    "tasks",
    actionId,
    dataActions.removeTask
  );

const deleteNote = (customerType, customerId, actionId) =>
  deleteAction(
    customerType,
    customerId,
    "notes",
    actionId,
    dataActions.removeNote
  );

export const dataActions = {
  ...dataSlice.actions,
  loadData,
  createLead,
  createAccount,
  createInteraction,
  createTask,
  createNote,
  deleteLead,
  deleteAccount,
  deleteInteraction,
  deleteTask,
  deleteNote,
  editLead,
  editAccount,
  editInteraction,
  editTask,
  editNote,
};

export default dataSlice;
