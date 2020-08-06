import { Entity, MovableEntity } from "../core/entity";
import { BrickTile, ChanceTile, GroundTile } from "./tiles";
import { PhaserRenderer } from "./renderer";
import { Mushroom, Flower } from "./items";

export type EntityType = 
     'mario'
    |'chance'
    |'brick'
    |'ground'
    |'flower'
    |'coin'
    |'mushroom';

export class EntityFactory {
    constructor(private readonly scene: Phaser.Scene) {}

    createMario(x,y) {
        return this.create('mario', x, y)
    }
    createBrick(x,y) {
        return this.create('brick', x, y)
    }
    createGround(x,y) {
        return this.create('ground', x, y)
    }
    createChance(x,y) {
        return this.create('chance', x, y)
    }

    create(name: 'mario', x: number, y: number): Mario;
    create(name: 'ground', x: number, y: number): GroundTile;
    create(name: 'brick', x: number, y: number): BrickTile;
    create(name: 'chance', x: number, y: number): ChanceTile;
    create(name: 'mushroom', x: number, y: number): Mushroom;
    create(name: 'flower', x: number, y: number): Flower;
    create(name: EntityType, x: number, y: number) {
        switch(name) {
            case 'mario': return new Mario(this.scene, name, x, y);
            case 'brick': return new BrickTile(this.scene, name, x, y);
            case 'ground': return new GroundTile(this.scene, name, x, y);
            case 'chance': return new ChanceTile(this.scene, name, x, y);
            case 'mushroom': return new Mushroom(this.scene, name, x, y);
            case 'flower': return new Flower(this.scene, name, x, y);
            default: throw new Error('[EntityFactory=>create] not implemented '+name)
        }
    }
}

export class Mario extends MovableEntity {
    kind: 'mario';
    canJump = true;
    currentAnim = '';
    currentAnimSpr;
    DER = 30;
    INERTIA = 10;
    constructor(scene, name, x, y) {
        super(scene, name, x, y);
    }
    initPhysics() {
        this.getBody().setSize(10,16);
        this.getBody().setGravityY(400);
        this.getBody().setMaxVelocity(100,350);
        this.state = 'little'
    }
    onFloor() {
        return this.getBody().touching.down;
    }
    move(direction) {
        let flip = direction === 'left' ? true : false;
        let acceleration = direction === 'left' ? -100 : +100;
        if (this.onFloor()) {
            if (this.currentAnim !== direction) {
                this.sprite.flipX= flip;
                this.currentAnimSpr = PhaserRenderer.play(direction, this.sprite);
                this.currentAnim = direction;
            }
            // derapage
            if (direction === 'left' && this.getBody().velocity.x > this.DER){
                this.getBody().setVelocityX(this.DER);
            }
            if (direction === 'right' && this.getBody().velocity.x < -this.DER){
                this.getBody().setVelocityX(-this.DER);
            }
            this.getBody().setAccelerationX(acceleration);
        } else {
            this.getBody().setAccelerationX(acceleration);
        }

        this.refreshJump();
    }
    jump() {
        if (!this.canJump) {
            this.getBody().setAccelerationY(0);
            return;
        };

        this.getBody().setAccelerationY(-2200);
        setTimeout(() => {
            this.getBody().setAccelerationY(0);
            this.canJump = false;
        }, 130);
    }
    action(){}
    doNothing() {
        this.sprite.anims.stop();
        this.currentAnim = '';
        this.getBody().setAccelerationX(0);
        const right = this.getBody().velocity.x > this.INERTIA ? this.getBody().velocity.x - 9 : 0;
        const left = this.getBody().velocity.x < -this.INERTIA ? this.getBody().velocity.x + 9 : 0;
        if (right != 0)this.getBody().setVelocityX(right);
        else if (left != 0) this.getBody().setVelocityX(left);
        else this.getBody().setVelocityX(left);

        this.refreshJump();
    }
    refreshJump() {
        if (this.onFloor()) {
            this.canJump = true;
            this.getBody().setVelocityY(0);
        }
    }
    becomeBig() {
        this.sprite.setScale(1, 2);
        this.state = 'big';
    }
    get isBig() {
        return this.state === 'big';
    }
}