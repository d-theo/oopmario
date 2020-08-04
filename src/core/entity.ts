export abstract class Entity {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    gravity = 150;
    kind: string;
    currentMovement: string;
}