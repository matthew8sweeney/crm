import { createSlice } from "@reduxjs/toolkit";

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
//   accounts: "same as leads"
// };

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    replaceData(state, action) {
      state = { ...state, ...action.payload };

      //TODO will have to create empty objects/arrays where backend had nothing
      
      return state;
    },
  },
});

export const dataActions = {
  ...dataSlice.actions,
};

export default dataSlice;
