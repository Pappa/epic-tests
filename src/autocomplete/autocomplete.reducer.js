import {
  AUTOCOMPLETE_START,
  AUTOCOMPLETE_END,
  AUTOCOMPLETE_CANCEL
} from "./autocomplete.actions";

const initialState = {
  term: ""
};

export const autocomplete = (state = initialState, action) => {
  switch (action.type) {
    case AUTOCOMPLETE_START:
    case AUTOCOMPLETE_END:
      return {
        ...state,
        term: action.payload
      };
    case AUTOCOMPLETE_CANCEL:
      return {
        ...state,
        term: ""
      };
    default:
      return state;
  }
};
