import {Action, ActionResult} from '../core/actions';
import { Entity } from '../core/entity';

export class JumpAction extends Action {
    constructor(private entity: Entity) {
        super();
    }
    perform(): ActionResult {
        return ok();
    }
}
export class MoveAction extends Action {
    constructor(private entity: Entity) {
        super();
    }
    perform(): ActionResult {

        return ok();
    }
}
export class RestAction extends Action {
    constructor(private entity: Entity) {
        super();
    }
    perform(): ActionResult {
        return ok();
    }
}
export class FireAction extends Action {
    perform(): ActionResult {
        return {
            status: 'ok',
            actions: [],
            events: [],
        }
    }
}

function fail(): ActionResult {
    return {
        status: 'fail',
        actions: [],
        events: [],
    }
}

function ok(): ActionResult {
    return {
        status: 'ok',
        actions: [],
        events: [],
    }
}