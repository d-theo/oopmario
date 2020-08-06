import { OneDayMario } from "./OneDayMario";

export abstract class Action {
    private static _game: OneDayMario;
    protected game: OneDayMario; // todo : private and just have some public methods
    constructor() {
        this.game = Action._game;
    }
    static bindOnce(game: OneDayMario) {
        Action._game = game;
    }

    abstract perform();
}