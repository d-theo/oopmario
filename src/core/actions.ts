import { ODMEvent } from "./events";
import { OneDayMario } from "../OneDayMario";

export abstract class Action {
    private static _game: OneDayMario;
    protected game: OneDayMario;
    constructor() {
        this.game = Action._game;
    }
    static bindOnce(game: OneDayMario) {
        Action._game = game;
    }

    abstract perform(): ActionResult;
}

export type ActionResult = {
    status: 'ok' | 'fail';
    actions: Action[];
    events: ODMEvent[];
}