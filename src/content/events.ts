import { ODMEvent, GameEventType } from "../core/events";
import { Entity } from "../core/entity";

export class GameEvent extends ODMEvent {
    constructor(public readonly type: GameEventType, public readonly actor: Entity, public args?: any) {
        super();
    }
}