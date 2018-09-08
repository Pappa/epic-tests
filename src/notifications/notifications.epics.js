import { LOGIN_SUCCESS, LOGOUT_SUCCESS, onSocketMessageAction, onSocketErrorAction } from './notifications.actions';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError, takeUntil, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const notificationsEpic = (action$, state$, { fromWebSocket }) => 
    action$.pipe(
        ofType(LOGIN_SUCCESS),
        switchMap(() => fromWebSocket()
            .pipe(
                takeUntil(action$.pipe(ofType(LOGOUT_SUCCESS))),
                map(({ payload }) => onSocketMessageAction(payload)),
                catchError(e => of(onSocketErrorAction(e)))
            )
        )
    );

export const asyncBoundariesEpic = (action$, state$, { fromWebSocket }) => 
action$.pipe(
    ofType(LOGIN_SUCCESS),
    switchMap((payload) => fromWebSocket(payload)
        .pipe(
            concatMap(({ payload }) => of({ type: "DATA_START"}, onSocketMessageAction(payload), { type: "DATA_END"})),
            catchError(e => of({ type: "DATA_START"}, onSocketErrorAction(e), { type: "DATA_END"}))
        )
    )
);