import { loginSuccessAction, onSocketMessageAction } from './notifications.actions';
import { notificationsEpic } from './notifications.epics';
import { toArray } from 'rxjs/operators';
import { asyncScheduler, of } from 'rxjs';

describe('notificationsEpic', () => {

    it('should receive a websocket message', done => {
        const action$ = of(loginSuccessAction(), asyncScheduler);
        const fromWebSocket = () => of({ payload: 'Hi!' });
        const expectedActions = [onSocketMessageAction('Hi!')];
        
        notificationsEpic(action$, {}, { fromWebSocket })
            .pipe(toArray())
            .subscribe(actions => {
                try {
                    expect(actions).toEqual(expectedActions);
                    done();
                } catch (e) {
                    done.fail(e);
                }
            })
    });

});