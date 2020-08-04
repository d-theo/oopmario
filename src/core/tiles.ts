import { IEventsFactory, ODMEvent } from "./events";

export abstract class Tiles {
    type: string;
    protected eventFactory: IEventsFactory;
    abstract onEnter(): ODMEvent;
    abstract onHit(): ODMEvent;
    abstract isWalkable(): boolean;
    abstract isBreakable(): boolean;
}