import { Tiles, TileVisitor } from "../core/tiles";
import { EntityType } from "./entities";

export class BrickTile extends Tiles {
    visits(v: TileVisitor) {
        return v.visitBrick(this);
    }
}
export class GroundTile extends Tiles {
    visits(v: TileVisitor) {
        return v.visitGround(this);
    }
}
export class ChanceTile extends Tiles {
    private _isLooted = false;
    private lootType: 'mushroom'|'flower'|'coin' = 'mushroom';
    get isLooted() {
        return this._isLooted;
    }
    set isLooted(l: boolean) {
        this._isLooted = l;
        this.sprite.setTexture('chance-used');
    }
    getLootName(): EntityType {
        return this.lootType;
    }
    changeLootTo(type: 'mushroom' | 'flower') {
        if ( this.lootType === 'coin' ) return;
        this.lootType = type;
    }
    visits(v: TileVisitor) {
        return v.visitChance(this);
    }
}

export class TileVisitorSorter implements TileVisitor {
    sortedTiles: {objects: any, name: EntityType, specificity: any}[] = [];
    visitBrick(tile: BrickTile) {
        this.sortedTiles.push({
            objects: tile,
            name: 'brick',
            specificity: {immovable: true}
        });
    }
    visitGround(tile: BrickTile) {
        this.sortedTiles.push({
            objects: tile,
            name: 'ground',
            specificity: {immovable: true}
        });
    }
    visitChance(tile: ChanceTile) {
        this.sortedTiles.push({
            objects: tile,
            name: 'chance',
            specificity: {immovable: true}
        });
    }
}

export class TileVisitorChangeLoot implements TileVisitor {
    constructor(private to: 'mushroom'|'flower') {}
    visitBrick(tile: BrickTile) {

    }
    visitGround(tile: BrickTile) {

    }
    visitChance(tile: ChanceTile) {
        tile.changeLootTo(this.to);
    }
}