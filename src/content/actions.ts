import {Action, ActionResult} from '../core/actions';
import { Entity } from '../core/entity';

export class JumpAction extends Action {
    constructor(private entity: Entity) {
        super();
    }
    perform(): ActionResult {
        if (this.entity.currentMovement === 'jumping') {
            return fail();
        } else {
            setTimeout(() => this.entity.currentMovement = 'still', 1000);
            this.entity.velocityY = -1200;
            this.entity.currentMovement = 'jumping'
            return ok();
        }
    }
}
export class MoveAction extends Action {
    constructor(private entity: Entity) {
        super();
    }
    perform(): ActionResult {
        this.entity.velocityX += 4;
        if (this.entity.velocityX > 130) {
            this.entity.velocityX = 130;
        }
        return ok();
    }
}
export class RestAction extends Action {
    constructor(private entity: Entity) {
        super();
    }
    perform(): ActionResult {
        if (this.entity.velocityX > 10) {
            this.entity.velocityX -= 2;
        } else if (this.entity.velocityX < -10) {
            this.entity.velocityX += 2;
        } else {
            this.entity.velocityX = 0;
        }
        if (this.entity.velocityY < 0) {
            this.entity.velocityY += 50;
        } else {
            this.entity.velocityY = 0;
        }
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