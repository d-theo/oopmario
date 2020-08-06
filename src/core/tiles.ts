import { Entity } from "./entity";

export abstract class Tiles extends Entity {
    type: string;
    abstract visits(visitor: TileVisitor);
    kill() {
        this.sprite.destroy();
    }
}

export interface TileVisitor {
    visitBrick(visitor: Tiles);
    visitGround(visitor: Tiles);
    visitChance(visitor: Tiles);
}