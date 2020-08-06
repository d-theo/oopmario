import { GamePhysics, CollisionStrategy, OverlapStrategy } from "../core/physics";
import { Entity } from "../core/entity";
import { ChanceTile } from "./tiles";
import { ChanceLooted, ItemLooted, MarioHitBrick } from "./actions";
import { GameEvent } from "./events";
import { Mario } from "./entities";

export class PhaserPhysics implements GamePhysics {
    static GamePhysics: Phaser.Physics.Arcade.ArcadePhysics;
    physics: Phaser.Physics.Arcade.ArcadePhysics;
    groups = new Map<string, Phaser.Physics.Arcade.Group>();
    constructor() {}
    bind(physics: Phaser.Physics.Arcade.ArcadePhysics) {
        this.physics = physics;
        PhaserPhysics.GamePhysics = physics;
    }
    addObject(object: Entity, opt: {name: string, args: any}) {
        if (!this.groups.has(opt.name)) {
            this.createGroupKind(opt.name, opt.args)
        }

        const g = this.groups.get(opt.name);
        g.add(object.getPhysicalObject());
    }
    addObjects(objects: Entity[], opt: {name: string, args: any}) {
        if (!this.groups.has(opt.name)) {
            this.createGroupKind(opt.name, opt.args)
        }

        const g = this.groups.get(opt.name);
        for (const object of objects) {
            g.add(object.getPhysicalObject());
        }
    }

    createGroupKind(kind: string, args: any) {
        const group = this.physics.add.group(args);
        this.groups.set(kind, group);
    }

    initializeCollision(collisionStrategy: CollisionStrategy[]) {
        for (const c of collisionStrategy) {
            const group1 = this.groups.get(c.group1);
            const group2 = this.groups.get(c.group2);
            this.physics.add.collider(group1, group2, c.collisionCallback.bind(c), c.shouldCollideCallback.bind(c));
        }
    }
    initializeOverlap(collapseStrategy: OverlapStrategy[]) {
        for (const c of collapseStrategy) {
            const group1 = this.groups.get(c.group1);
            const group2 = this.groups.get(c.group2);
            this.physics.add.overlap(group1, group2, c.overlapCallback.bind(c));
        }
    }
}

export class MarioGroundCollisionStrategy extends CollisionStrategy {
    group1 = 'mario';
    group2 = 'ground';
    shouldCollideCallback(e, e2) {return true}
    collisionCallback(e1, e2) {}
}
export class MarioBrickCollisionStrategy extends CollisionStrategy {
    group1 = 'mario';
    group2 = 'brick';
    shouldCollideCallback(e1, e2) {return true}
    collisionCallback(mario, brick) {
        const marioEntity: Mario = mario.getData('parent');
        if (brick.body.touching.down && mario.body.touching.up) {
            this.gameEngine.setAction(new MarioHitBrick(marioEntity, brick.getData('parent')));
        }
    }
}
export class MarioChanceCollisionStrategy extends CollisionStrategy {
    group1 = 'mario';
    group2 = 'chance';

    collisionCallback(_mario, _chance) {
        const entity: ChanceTile = _chance.getData('parent');
        if (_chance.body.touching.down && _mario.body.touching.up && !entity.isLooted) {
            this.gameEngine.setAction(new ChanceLooted(entity));
        }
    }
    shouldCollideCallback(_mario, _chance) {    
        const d = Math.abs(_chance.body.x - (_mario.body.x+10));
        if (d <= 3 && _mario.body.y >= _chance.body.y) {
            this.gameEngine.addEvent(new GameEvent('DeviateLeft', _mario.getData('parent'), d));
            return false;
        }

        const pd = Math.abs(_chance.body.x+16 - (_mario.body.x));
        if (pd <= 3 && _mario.body.y >= _chance.body.y) {
            this.gameEngine.addEvent(new GameEvent('DeviateRight', _mario.getData('parent'), pd));
            return false;
        }
        return true;
    }
}

export class ItemGroundCollisionStrategy extends CollisionStrategy {
    group1 = 'item';
    group2 = 'ground';
    shouldCollideCallback(e, e2) {return true}
    collisionCallback(e1, e2) {}
}
export class ItemBrickCollisionStrategy extends CollisionStrategy {
    group1 = 'item';
    group2 = 'brick';
    shouldCollideCallback(e, e2) {return true}
    collisionCallback(e1, e2) {}
}
export class ItemChanceCollisionStrategy extends CollisionStrategy {
    group1 = 'item';
    group2 = 'chance';
    shouldCollideCallback(e, e2) {return true}
    collisionCallback(e1, e2) {}
}
export class MarioItemOverlapStrategy extends OverlapStrategy {
    group1 = 'mario';
    group2 = 'item';
    overlapCallback(e1: Phaser.GameObjects.Sprite, item: Phaser.GameObjects.Sprite) {
        this.gameEngine.setAction(new ItemLooted(item.getData('parent')));
    }
}