import {Action} from '../core/actions';
import { MovableEntity } from '../core/entity';
import { fromPix } from './utils';
import { Item } from '../core/items';
import { ChanceTile, BrickTile, TileVisitorChangeLoot } from './tiles';
import { Mario } from './entities';
import { GameEvent } from './events';

export class JumpAction extends Action {
    constructor(private entity: MovableEntity) {
        super();
    }
    perform() {
        this.entity.jump();
    }
}
export class MoveAction extends Action {
    constructor(private entity: MovableEntity, private direction: string) {
        super();
    }
    perform() {
        this.entity.move(this.direction);
    }
}
export class RestAction extends Action {
    constructor(private entity: MovableEntity) {
        super();
    }
    perform() {
        this.entity.doNothing();
    }
}

export class ChanceLooted extends Action {
    constructor(private readonly chance: ChanceTile) {
        super();
    }
    perform() {
        this.game.addEvent(new GameEvent('ChancePop', this.chance));
        this.chance.isLooted = true;
        const itemName = this.chance.getLootName();
        const pos = fromPix({x:this.chance.sprite.x, y:this.chance.sprite.y});
        const item: unknown = this.game.entityFactory.create(itemName as any, pos.x, pos.y+1);
        this.game.addItem(item as Item);
    }
}
export class ItemLooted extends Action {
    constructor(private readonly item: Item) {
        super();
    }
    perform() {
        switch (this.item.name) {
            case 'mushroom': 
                this.item.kill();
                return this.game.setAction(new MarioAteMushroom());
            default: throw new Error('[ItemLooted=>perform]not implemented '+this.item.name);
        }
    }
}

export class MarioHitBrick extends Action {
    constructor(private mario: Mario, private brick: BrickTile) {
        super();
    }
    perform() {
        if (this.mario.isBig) {
            this.game.addEvent(new GameEvent('BrickBreak', this.brick));
            this.game.stage.killTile(this.brick);
        } else {
            this.game.addEvent(new GameEvent('BrickBounce', this.brick));
        }
    }
}

export class MarioAteMushroom extends Action {
    perform() {
        const mario = this.game.mario as Mario;
        mario.becomeBig();
        if (mario.getBody().touching.down) {
            this.game.addEvent(new GameEvent('BounceUp', mario));
        }
        this.game.stage.visitTiles(new TileVisitorChangeLoot('flower'));
    }
}