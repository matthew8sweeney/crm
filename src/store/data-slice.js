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

/**
 * Fill in empty/default values where backend has nothing
 */
const normalizeCustomersState = (customersState) => {
  for (const customerId in customersState) {
    customersState[customerId] = {
      ...initialCustomerState,
      ...customersState[customerId],
    };
    const customerState = customersState[customerId];
    normalizeActionsState(customerState.interactions, initialInteractionState);
    normalizeActionsState(customerState.tasks, initialTaskState);
    normalizeActionsState(customerState.notes, initialNoteState);
  }
};

const normalizeActionsState = (actionsState, initialActionState) => {
  for (const actionId in actionsState) {
    actionsState[actionId] = {
      ...initialActionState,
      ...actionsState[actionId],
    };
  }
};

const addAction = (state, payload, actionType, initialActionState) => {
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
      state = { ...initialState, ...action.payload };
      normalizeCustomersState(state.leads);
      normalizeCustomersState(state.accounts);
      return state;
    },
    addCustomer(state, action) {
      const customers = state[action.payload.type]; // either leads or accounts
      const id = action.payload.id;
      customers[id] = { ...initialCustomerState, ...action.payload.data };
    },
    addInteraction(state, action) {
      addAction(state, action.payload, "interactions", initialInteractionState);
    },
    addTask(state, action) {
      addAction(state, action.payload, "tasks", initialTaskState);
    },
    addNote(state, action) {
      addAction(state, action.payload, "notes", initialNoteState);
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

const createAction = (
  actionData,
  customerType,
  customerId,
  actionType,
  reducer
) => {
  return async (dispatch) => {
    const data = await manageJsonRequest({
      url: `${FIREBASE_URL}/${customerType}/${customerId}/${actionType}.json`,
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
};

export default dataSlice;
