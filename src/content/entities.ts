import { Entity } from "../core/entity";

export class Mario extends Entity {
    kind: 'mario';
    constructor() {
        super();
        this.velocityX = 0;
        this.velocityY = 0;
        this.currentMovement = 'still';
    }
}

const mushroom = {
    kind: 'mushroom'
};
const turtle = {
    kind: 'turtle'
};

export class Enemy extends Entity {
}