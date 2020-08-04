import { ODMEvent, IEventsFactory } from "./events";

export abstract class Item {
    static ids = 0;
    x: number;
    y: number;
    id: number;
    kind: string;
    eventFactory: IEventsFactory;
    abstract onPickedUp(): ODMEvent;
    abstract getEvent(): ODMEvent;
    constructor() {
        this.id = ++Item.ids;
    }
}