import {Content} from './content';
import { Action } from './actions';
import { ODMEvent } from './events';

export class Logic {
    pendingEvents: ODMEvent[] = [];
    constructor(private readonly content: Content) {}
    update() {
        this.content.stage.update();
    }
    getContent() {
        return this.content;
    }
    setAction(action: Action) {
        const res = action.perform();
        if (res.status !== 'ok') {
            return;
        }

        this.pendingEvents = this.pendingEvents.concat(res.events);

        for (let action of res.actions) {
            this.setAction(action);
        }
        for (let event of this.pendingEvents) {
            event.trigger();
        }
        this.pendingEvents = [];
    }
}