import { Logic } from "./logic";
import { Content } from "./content";
import { LoaderFactory } from "../content/loaders";
import {Action} from './actions';
import { ODMEvent } from "./events";
import { Stage } from "./stage";
import { EntityFactory } from "../content/entities";
import { GamePhysics } from "./physics";

import {
    MarioGroundCollisionStrategy,
    MarioBrickCollisionStrategy,
    MarioChanceCollisionStrategy,
    MarioItemOverlapStrategy,
    ItemGroundCollisionStrategy,
    ItemBrickCollisionStrategy,
    ItemChanceCollisionStrategy,
} from "../content/physics";

import { TileVisitorSorter } from "../content/tiles";
import { Item } from "./items";

export class OneDayMario {
    private _logic: Logic;
    constructor(private physics: GamePhysics, public entityFactory: EntityFactory) {
        const stageLoader = new LoaderFactory();
        this._logic = new Logic(new Content(stageLoader, entityFactory));
        Action.bindOnce(this);
    }
    public setAction(action: Action) {
        this.logic.setAction(action);
    }
    public addEvent(event: ODMEvent) {
        this.logic.addEvent(event);
    }
    update() {
        const report = {
            events: this.logic.pendingEvents,
            hasEvents: this.logic.pendingEvents.length > 0
        }
        this.logic.clearEvents();
        return report;
    }
    get logic(): Logic {
        return this._logic;
    }
    get content(): Content {
        return this.logic.getContent();
    }
    get stage(): Stage {
        return this.logic.getContent().stage;
    }
    get mario() {
        return this.stage.mario;
    }
    addItem(item: Item) {
        this.physics.addObject(item, {name: 'item', args: {}});
    }
    buildStage(level: string) {
        this.content.setLevel(level);
        this.content.buildStage();
        const mario = this.stage.mario;
        const tiles = this.stage.tiles;

        const tileVisitorSorter = new TileVisitorSorter();
        for (const tile of tiles) {
            tile.visits(tileVisitorSorter);
        }

        for (const group of tileVisitorSorter.sortedTiles) {
            this.physics.addObject(group.objects, {name: group.name, args: group.specificity});
        }
        this.physics.addObject(mario, {name: 'mario', args: {}});
        this.physics.addObjects([], {name: 'item', args: {}});
        this.physics.initializeCollision([
            new MarioGroundCollisionStrategy(this),
            new MarioBrickCollisionStrategy(this),
            new MarioChanceCollisionStrategy(this),
            new ItemGroundCollisionStrategy(this),
            new ItemBrickCollisionStrategy(this),
            new ItemChanceCollisionStrategy(this),
        ]);
        this.physics.initializeOverlap([
            new MarioItemOverlapStrategy(this)
        ]);
    }
}