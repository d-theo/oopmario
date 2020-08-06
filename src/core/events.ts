import { Entity } from "./entity";

export type GameEventType = 
     'ChancePop'
    |'BrickBounce'
    |'BrickBreak'
    |'DeviateRight'
    |'BounceUp'
    |'DeviateLeft';


export abstract class ODMEvent {
    public type: GameEventType;
    public actor: Entity;
    public args?: any;
    constructor() {
        console.log(this.constructor.name);
    }
}

/*export abstract class ODMEvent {
    private static _game: OneDayMario;
    protected game: OneDayMario;
    public type: GameEventType;
    public actor: Entity;
    public args?: any;
    constructor() {
        this.game = ODMEvent._game;
        console.log(this.constructor.name);
    }
    static bindOnce(game: OneDayMario) {
        ODMEvent._game = game;
    }
}*/