import { ODMEvent, IEventsFactory } from "../core/events";
import { Coin } from "./items";

export class EmptyEvent extends ODMEvent {
    trigger() {
        console.log('pwet !');
    }
}

export class CoinEvent extends ODMEvent {
    private coin: Coin;
    bindOnce(coin: Coin) {
        this.coin = coin;
        return this;
    }
    trigger() {
        this.game.getContent().points += 1000;
        this.game.getStage().removeItem(this.coin);
    }
}

export class EventsFactory implements IEventsFactory {
    create(type: string, args: unknown): ODMEvent {
        switch (type) {
            case 'CoinEvent': return new CoinEvent().bindOnce(args as Coin);
            case 'Empty': return new EmptyEvent();
            default: throw new Error('not implemented');
        }
    }
}