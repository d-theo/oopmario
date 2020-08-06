import { toPix } from "../content/utils";
import { PhaserPhysics } from "../content/physics";

export abstract class Entity extends Phaser.GameObjects.GameObject {
    kind: string;
    sprite: Phaser.GameObjects.Sprite;
    constructor(scene, name, x, y) {
        super(scene, name);
        const pos = toPix({x, y});
        this.name = name;
        this.sprite = this.scene.add.sprite(pos.x, pos.y, name);
        PhaserPhysics.GamePhysics.add.existing(this.sprite, false);
        this.sprite.setData('parent', this);
    }
    getBody() {
        return this.sprite.body as Phaser.Physics.Arcade.Body;
    }
    getPhysicalObject() {
        return this.sprite;
    }
}

export abstract class MovableEntity extends Entity {
    constructor(scene, name, x, y) {
        super(scene, name, x, y);
        setTimeout(() => {
            this.initPhysics();
        }, 10)
    }
    abstract move(direction);
    abstract jump();
    abstract action();
    abstract doNothing();
    abstract initPhysics();
    kill () {
        this.sprite.destroy();
    }
}