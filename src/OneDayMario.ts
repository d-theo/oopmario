import { Logic } from "./core/logic";
import { Content } from "./core/content";
import { LoaderFactory } from "./content/loaders";
import {Action} from './core/actions';
import { ODMEvent } from "./core/events";
import { Stage } from "./core/stage";

export class OneDayMario {
    private logic: Logic;
    constructor() {
        const stageLoader = new LoaderFactory();
        this.logic = new Logic(new Content(stageLoader));
        Action.bindOnce(this);
        ODMEvent.bindOnce(this);
    }
    public setAction(action: Action) {
        this.logic.setAction(action);
    }
    getLogic(): Logic {
        return this.logic;
    }
    getContent(): Content {
        return this.logic.getContent();
    }
    getStage(): Stage {
        return this.logic.getContent().stage;
    }
}