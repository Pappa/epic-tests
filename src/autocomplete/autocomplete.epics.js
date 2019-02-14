import {
  AUTOCOMPLETE_START,
  AUTOCOMPLETE_CANCEL,
  autocompleteEndAction
} from "./autocomplete.actions";
import { ofType } from "redux-observable";
import { switchMap, mapTo, takeUntil, delay, debounce } from "rxjs/operators";
import { of, timer } from "rxjs";

export const autocompleteEpic = (action$, state$, {}) =>
  action$.pipe(
    ofType(AUTOCOMPLETE_START),
    debounce(_ => timer(100)),
    switchMap(() =>
      fakeAjax().pipe(
        mapTo(autocompleteEndAction()),
        takeUntil(action$.pipe(ofType(AUTOCOMPLETE_CANCEL)))
      )
    )
  );

const fakeAjax = () => of({ type: "RESPONSE", payload: {} }).pipe(delay(500));
