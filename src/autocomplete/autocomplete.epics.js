import {
  AUTOCOMPLETE_START,
  AUTOCOMPLETE_CANCEL,
  autocompleteEndAction
} from "./autocomplete.actions";
import { ofType } from "redux-observable";
import { switchMap, map, takeUntil, delay, debounce } from "rxjs/operators";
import { of, timer } from "rxjs";

export const autocompleteEpic = (action$, state$) =>
  action$.pipe(
    ofType(AUTOCOMPLETE_START),
    debounce(_ => timer(1000)),
    switchMap(() =>
      fakeAjax().pipe(
        takeUntil(action$.pipe(ofType(AUTOCOMPLETE_CANCEL))),
        map(autocompleteEndAction)
      )
    )
  );

const fakeAjax = () => of(1).pipe(delay(500));
