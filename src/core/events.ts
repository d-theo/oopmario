import { OneDayMario } from "../OneDayMario";

export interface IEventsFactory {
    create(type: string, args: unknown): ODMEvent;
}

export abstract class ODMEvent {
    private static _game: OneDayMario;
    protected game: OneDayMario;
    constructor() {
        this.game = ODMEvent._game;
    }
    static bindOnce(game: OneDayMario) {
        ODMEvent._game = game;
    }

    abstract trigger();
}