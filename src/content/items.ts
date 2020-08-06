import { Item } from "../core/items";

export class Mushroom extends Item {
    constructor(scene, name, x, y) {
        super(scene, name, x, y);
    }
    initPhysics() {
        this.getBody().setAccelerationX(50);
        this.getBody().setGravityY(1000);
        this.getBody().setMaxVelocity(60, 500);
    }
    move(direction: any) {
        throw new Error("Method not implemented.");
    }
    jump() {
        throw new Error("Method not implemented.");
    }
    action() {
        throw new Error("Method not implemented.");
    }
    doNothing() {
        throw new Error("Method not implemented.");
    }
}
export class Flower extends Item {
    constructor(scene, name, x, y) {
        super(scene, name, x, y);
    }
    initPhysics() {}
    move(direction: any) {
        throw new Error("Method not implemented.");
    }
    jump() {
        throw new Error("Method not implemented.");
    }
    action() {
        throw new Error("Method not implemented.");
    }
    doNothing() {
        throw new Error("Method not implemented.");
    }
}
