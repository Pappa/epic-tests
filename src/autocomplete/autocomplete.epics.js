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
  mergeMap
} from "rxjs/operators";
import { of, iif, timer, merge, EMPTY } from "rxjs";

// https://stackoverflow.com/questions/45513629/debouncing-and-cancelling-with-redux-observable

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

// export const autocompleteEpic2 = (action$, state$) => {
//   return merge(
//     action$.pipe(
//       ofType(AUTOCOMPLETE_START),
//       debounceTime(1000),
//       mapTo(true)
//     ),
//     action$.pipe(
//       ofType(AUTOCOMPLETE_CANCEL),
//       debounceTime(1000),
//       mapTo(false)
//     )
//   ).pipe(
//     tap(console.log.bind(null)),
//     map(x => (x ? { type: "YOUR_MOM" } : { type: "CANCELLED" }))
//   );
// };

// export const autocompleteEpic3 = (action$, state$) => {
//   const requestAction$ = action$.pipe(
//     ofType(AUTOCOMPLETE_START),
//     share()
//   );
//   return merge(
//     action$.pipe(
//       ofType(AUTOCOMPLETE_CANCEL),
//       mapTo(false)
//     ),
//     requestAction$.pipe(mapTo(true))
//   ).pipe(
//     distinctUntilChanged(),
//     iif(
//       condition => condition,
//       requestAction$.pipe(
//         debounceTime(250),
//         switchMap(() =>
//           fakeAjax().pipe(
//             takeUntil(action$.pipe(ofType(AUTOCOMPLETE_CANCEL))),
//             map(autocompleteEndAction)
//           )
//         ),
//         EMPTY
//       )
//     )
//   );
// };

const fakeAjax = () => of(1).pipe(delay(500));
