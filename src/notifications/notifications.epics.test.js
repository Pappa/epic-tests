import { ActionsObservable } from 'redux-observable';
import { loginSuccessAction, onSocketMessageAction } from './notifications.actions';
import { notificationsEpic } from './notifications.epics';
import { toArray } from 'rxjs/operators';
import { of } from 'rxjs';

describe('notificationsEpic', () => {

    it('should receive a websocket message', done => {
        const action$ = ActionsObservable.of(loginSuccessAction());
        const fromWebSocket = of({ payload: 'Hi!' });
        const expectedActions = [onSocketMessageAction('Hi!')];
        
        notificationsEpic(action$, {}, { fromWebSocket })
            .pipe(toArray())
            .subscribe(actions => {
                expect(actions).toEqual(expectedActions);
                done();
            })
    });

});