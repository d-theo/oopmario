import { Entity } from "./entity";
import { OneDayMario } from "./OneDayMario";


export interface GamePhysics {
    bind(args: any);
    addObjects(objects: Entity[], opt: {name: string, args: any});
    addObject(object: Entity, opt: {name: string, args: any});
    initializeCollision(collisionStrategy: CollisionStrategy[]);
    initializeOverlap(overlapStrategy: OverlapStrategy[]);
}

export abstract class CollisionStrategy {
    scene: Phaser.Scene;
    static _Scene: Phaser.Scene;
    group1: string;
    group2: string;
    constructor(protected readonly gameEngine: OneDayMario) {
        this.scene = CollisionStrategy._Scene;
    }
    static bind(scene: Phaser.Scene) {
        CollisionStrategy._Scene = scene;
    }
    abstract collisionCallback(e1: Phaser.GameObjects.Sprite, e2: Phaser.GameObjects.Sprite);
    abstract shouldCollideCallback(e1: Phaser.GameObjects.Sprite, e2: Phaser.GameObjects.Sprite);
}

export abstract class OverlapStrategy {
    scene: Phaser.Scene;
    static _Scene: Phaser.Scene;
    group1: string;
    group2: string;
    constructor(protected readonly gameEngine: OneDayMario) {
        this.scene = OverlapStrategy._Scene;
    }
    static bind(scene: Phaser.Scene) {
        OverlapStrategy._Scene = scene;
    }
    abstract overlapCallback(e1: Phaser.GameObjects.Sprite, e2: Phaser.GameObjects.Sprite);
}