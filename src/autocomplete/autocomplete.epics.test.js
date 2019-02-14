import {
  autocompleteStartAction,
  autocompleteEndAction,
  autocompleteCancelAction
} from "./autocomplete.actions";
import { autocompleteEpic } from "./autocomplete.epics";
import { toArray, map, take, tap } from "rxjs/operators";
import { asyncScheduler, of, interval } from "rxjs";

describe("autocompleteEpic", () => {
  it("should receive an AUTOCOMPLETE_END action 1", done => {
    const action$ = of(autocompleteStartAction(), asyncScheduler);
    const expectedActions = [autocompleteEndAction()];

    autocompleteEpic(action$, {}, {})
      .pipe(toArray())
      .subscribe(actions => {
        try {
          expect(actions).toEqual(expectedActions);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
  });

  it("should receive an AUTOCOMPLETE_END action 2", done => {
    const actions = [autocompleteStartAction(), autocompleteCancelAction()];
    const action$ = interval(1000).pipe(
      map(x => actions[x]),
      take(2)
    );
    const expectedActions = [autocompleteEndAction()];

    autocompleteEpic(action$, {}, {})
      .pipe(toArray())
      .subscribe(actions => {
        try {
          expect(actions).toEqual(expectedActions);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
  });

  it("should not receive an AUTOCOMPLETE_END action 1", done => {
    const action$ = of(
      autocompleteStartAction(),
      autocompleteStartAction(),
      autocompleteCancelAction(),
      autocompleteStartAction(),
      autocompleteCancelAction(),
      asyncScheduler
    );
    const expectedActions = [];

    autocompleteEpic(action$, {}, {})
      .pipe(toArray())
      .subscribe(actions => {
        try {
          expect(actions).toEqual(expectedActions);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
  });

  it("should not receive an AUTOCOMPLETE_END action 2", done => {
    const actions = [
      autocompleteStartAction(),
      autocompleteCancelAction(),
      autocompleteStartAction(),
      autocompleteCancelAction()
    ];
    const action$ = interval(150).pipe(
      map(x => actions[x]),
      take(4)
    );
    const expectedActions = [];

    autocompleteEpic(action$, {}, {})
      .pipe(toArray())
      .subscribe(actions => {
        try {
          expect(actions).toEqual(expectedActions);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
  });
});
