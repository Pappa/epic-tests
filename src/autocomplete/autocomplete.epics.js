import {
  AUTOCOMPLETE_START,
  AUTOCOMPLETE_CANCEL,
  autocompleteEndAction
} from "./autocomplete.actions";
import { ofType } from "redux-observable";
import {
  switchMap,
  map,
  tap,
  takeUntil,
  delay,
  debounce
} from "rxjs/operators";
import { of, timer } from "rxjs";

export const autocompleteEpic = (action$, state$, {}) =>
  action$.pipe(
    ofType(AUTOCOMPLETE_START),
    debounce(_ => timer(100)),
    switchMap(() =>
      fakeAjax().pipe(
        map(response => autocompleteEndAction(response)),
        takeUntil(action$.pipe(ofType(AUTOCOMPLETE_CANCEL)))
      )
    )
  );

const fakeAjax = () =>
  of("Trev").pipe(
    tap(console.log.bind(null)),
    delay(500)
  );
