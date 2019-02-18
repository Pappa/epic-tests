import {
  AUTOCOMPLETE_START,
  AUTOCOMPLETE_CANCEL,
  autocompleteEndAction
} from "./autocomplete.actions";
import { ofType } from "redux-observable";
import {
  switchMap,
  map,
  takeUntil,
  delay,
  debounce,
  debounceTime,
  mapTo,
  tap,
  switchMapTo,
  share,
  distinctUntilChanged,
  mergeMap,
  take,
  retry,
  filter
} from "rxjs/operators";
import { of, iif, timer, interval, merge, EMPTY, race } from "rxjs";

// https://stackoverflow.com/questions/45513629/debouncing-and-cancelling-with-redux-observable

// export const autocompleteEpic = (action$, state$) =>
//   action$.pipe(
//     ofType(AUTOCOMPLETE_START),
//     debounce(_ => timer(1000)),
//     switchMap(() =>
//       fakeAjax().pipe(
//         takeUntil(action$.pipe(ofType(AUTOCOMPLETE_CANCEL))),
//         map(autocompleteEndAction)
//       )
//     )
//   );

export const autocompleteEpic = action$ => {
  const start$ = action$.pipe(
    ofType(AUTOCOMPLETE_START),
    share()
  );
  return merge(
    action$.pipe(
      ofType(AUTOCOMPLETE_CANCEL),
      mapTo(false)
    ),
    start$.pipe(mapTo(true))
  ).pipe(
    debounceTime(500),
    distinctUntilChanged(),
    filter(x => x),
    switchMap(() =>
      fakeAjax().pipe(
        takeUntil(action$.pipe(ofType(AUTOCOMPLETE_CANCEL))),
        map(autocompleteEndAction)
      )
    )
  );
};

const fakeAjax = () => of(1).pipe(delay(500));
