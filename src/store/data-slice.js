import { createSlice } from "@reduxjs/toolkit";

import { manageJsonRequest } from "../lib/api";

const FIREBASE_URL = "https://ms-crm-web-app-default-rtdb.firebaseio.com/";

const initialState = { leads: {}, accounts: {} };
// const stateShape =
// {
//   leads: {
//     leadId: {
//       interactions: {
//         emails: [
//           "{email objects}",
//         ],
//         phoneCalls: [
//           "{phoneCall objects}",
//         ]
//       },
//       tasks: [
//         "{task objects}",
//       ],
//       notes: [
//         "{note objects}",
//       ]
//     },
//   },
//   accounts: "(same as leads)",
//   interactionTypes: {
//     t1: { name: "str" },
//   },
//   industries: {
//     i1: { name: "str" },
//   },
// };

const initialCustomerState = {
  latestAction: "New",
  interactions: {},
  tasks: {},
  notes: {},
};

const initialNoteState = {
  actionType: "Note",
  title: "",
  text: "",
};

/**
 * Fill in empty/default values where backend had nothing
 */
const normalizeCustomersState = (customersState) => {
  for (const customerId in customersState) {
    customersState[customerId] = {
      ...initialCustomerState,
      ...customersState[customerId],
    };
    normalizeNotesState(customersState[customerId].notes);
  }
};

const normalizeNotesState = (notesState) => {
  for (const noteId in notesState) {
    notesState[noteId] = {
      ...initialNoteState,
      ...notesState[noteId],
    };
  }
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
    addNote(state, action) {
      const customerType = action.payload.customerType;
      const customerId = action.payload.customerId;
      const customer = state[customerType][customerId];
      customer.notes[action.payload.noteId] = {
        ...initialNoteState,
        ...action.payload.data,
      };
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

const createCustomer = (customerData, path) => {
  return async (dispatch) => {
    const data = await manageJsonRequest(
      {
        url: `${FIREBASE_URL}/${path}.json`,
        method: "POST",
        body: customerData,
      },
      dispatch
    );

    // console.log(data);
    if (data instanceof Error) {
      // notify failure
    } else {
      dispatch(
        dataActions.addCustomer({
          type: path,
          id: data.name,
          data: customerData,
        })
      );
    }
  };
};

const createLead = (leadData) => createCustomer(leadData, "leads");
const createAccount = (accountData) => createCustomer(accountData, "accounts");

const createNote = (noteData, customerType, customerId) => {
  return async (dispatch) => {
    const data = await manageJsonRequest(
      {
        url: `${FIREBASE_URL}/${customerType}/${customerId}/notes.json`,
        method: "POST",
        body: noteData,
      },
      dispatch
    );

    if (data instanceof Error) {
      // notify failure
    } else {
      dispatch(
        dataActions.addNote({
          customerType,
          customerId,
          noteId: data.name,
          data: noteData,
        })
      );
    }
  };
};

export const dataActions = {
  ...dataSlice.actions,
  loadData,
  createLead,
  createAccount,
  createNote,
};

export default dataSlice;
