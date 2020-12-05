import { allInfos } from "../actions";

const INITIAL_STATE = {};
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_INFO":
      return { ...state.info, ...action.payload };
    default:
      return state;
  }
};
