export const AUTOCOMPLETE_START = "AUTOCOMPLETE_START";
export const AUTOCOMPLETE_END = "AUTOCOMPLETE_END";
export const AUTOCOMPLETE_CANCEL = "AUTOCOMPLETE_CANCEL";

export const autocompleteStartAction = () => ({
  type: AUTOCOMPLETE_START
});

export const autocompleteEndAction = term => ({
  type: AUTOCOMPLETE_END,
  payload: term
});

export const autocompleteCancelAction = () => ({
  type: AUTOCOMPLETE_CANCEL
});
