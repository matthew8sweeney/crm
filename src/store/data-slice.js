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

const initialCustomerState = {
  latestAction: "New",
  address: "",
  website: "",
  interactions: {},
  tasks: {},
  notes: {},
};

const initialInteractionState = {
  actionType: "Interaction",
  interactionTypeId: "",
};

const initialTaskState = {
  actionType: "Task",
  title: "",
  description: "",
};

const initialNoteState = {
  actionType: "Note",
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
const normalizeCustomersState = (
  customersState,
  customerType,
  actionsState
) => {
  for (const customerId in customersState) {
    customersState[customerId] = {
      ...initialCustomerState,
      ...customersState[customerId],
    };
    const customerState = customersState[customerId];
    normalizeActionsState(
      customerState,
      actionsState.interactions[customerType][customerId],
      "interactions"
    );
    normalizeActionsState(
      customerState,
      actionsState.tasks[customerType][customerId],
      "tasks"
    );
    normalizeActionsState(
      customerState,
      actionsState.notes[customerType][customerId],
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
      customers[id] = { ...initialCustomerState, ...action.payload.data };
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

const createCustomer = (customerData, customerType) => {
  return async (dispatch) => {
    const data = await manageJsonRequest({
      url: `${FIREBASE_URL}/${customerType}.json`,
      method: "POST",
      body: customerData,
    });

    // console.log(data);
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

const createLead = (leadData) => createCustomer(leadData, "leads");
const createAccount = (accountData) => createCustomer(accountData, "accounts");

const deleteCustomer = (customerType, customerId) => {
  return async (dispatch) => {};
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
};

export default dataSlice;
