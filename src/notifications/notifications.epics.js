import { LOGIN_SUCCESS, LOGOUT_SUCCESS, onSocketMessageAction, onSocketErrorAction } from './notifications.actions';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';

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