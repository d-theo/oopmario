import {Content} from './content';
import { Action } from './actions';
import { ODMEvent } from './events';

export class Logic {
    _pendingEvents: ODMEvent[] = [];
    constructor(private readonly content: Content) {}
    getContent() {
        return this.content;
    }
    setAction(action: Action) {
        action.perform();
    }
    addEvent(event: ODMEvent) {
        this._pendingEvents.push(event);
    }
    get pendingEvents() {
        return this._pendingEvents;
    }
    clearEvents() {
        this._pendingEvents = [];
    }
}