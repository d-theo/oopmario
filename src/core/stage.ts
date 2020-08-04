import { Tiles } from "./tiles";
import {Item} from './items';
import {Entity} from './entity';
import {IStageLoader} from './loader';
import { Mario } from "../content/entities";

export class Stage {
    private _tiles: Tiles[];
    private _items: Item[];
    private _monsters: Entity[];
    public tilemap: number[][];
    public mario: Mario;
    constructor(private loader: IStageLoader, private level: string) {
        loader.build(this.level);
        this._items = loader.getItems();
        this._monsters = loader.getMonsters();
        this._tiles = loader.getTiles();
        this.tilemap = loader.getTiles();
        this.mario = new Mario();
    }
    get item () {return this._items}
    get monsters () {return this._monsters}
    get tiles () {return this._tiles}

    removeItem(item: Item) {
        this._items = this._items.filter(i => i.id !== item.id);
        // TODO REMOVE ITEM UI
    }

    update() {
        this.monsters.forEach(m => {
            // TODO IA STUFF
        });
    }
}