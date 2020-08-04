import { Tiles } from "../core/tiles";
import { ODMEvent } from "../core/events";

export class BrickTile extends Tiles {
    onEnter(): ODMEvent {
        return this.eventFactory.create('Empty', null);
    }
    onHit(): ODMEvent {
        return this.eventFactory.create('Empty', null);
    }
    isWalkable(): boolean {
        return false;
    }
    isBreakable(): boolean {
        return true;
    }
}