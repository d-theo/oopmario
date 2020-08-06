import { Tiles, TileVisitor } from "./tiles";
import {Item} from './items';
import {Entity} from './entity';
import {IStageLoader} from './loader';
import { EntityFactory } from "../content/entities";

export class Stage {
    private _tiles: Tiles[];
    private _items: Item[];
    private _monsters: Entity[];
    private _mario: Entity;
    constructor(private loader: IStageLoader, private level: string, private entityFactory: EntityFactory) {}
    build() {
        this.loader.build(this.level);
        this._items = [];
        this._monsters = [];
        this._tiles = this.loader.getTiles()
            .map(t => this.entityFactory.create(t.kind, t.x, t.y));
        this._mario = this.entityFactory.createMario(this.loader.getHero().x, this.loader.getHero().y);
    }
    get items () {return this._items}
    get monsters () {return this._monsters}
    get tiles () {return this._tiles}
    get mario() {return this._mario}
    killTile(t: Tiles) {
        // todo remove from list..
        t.kill();
    }
    forEachItem(f: (i: Item) => void) {
        for (let i = 0; i < this.items.length; i++) {
            f(this.items[i]);
        }
    }
    visitTiles(visitor: TileVisitor) {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].visits(visitor);
        }
    }
}