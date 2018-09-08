import { loginSuccessAction, onSocketMessageAction } from './notifications.actions';
import { notificationsEpic, asyncBoundariesEpic } from './notifications.epics';
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

describe('Multiple actiions returned', () => {

    it('should merge the response with an additional action', done => {
        const action$ = of(loginSuccessAction(), asyncScheduler);
        const fromWebSocket = () => of({ payload: 'Hi!' });
        const expectedActions = [{ type: "DATA_START"}, onSocketMessageAction('Hi!'), { type: "DATA_END"}];
        
        asyncBoundariesEpic(action$, {}, { fromWebSocket })
            .pipe(toArray())
            .subscribe(
                actions => {
                    try {
                        expect(actions).toEqual(expectedActions);
                        done();
                    } catch (e) {
                        done.fail(e);
                    }
                }
            )
    });

});