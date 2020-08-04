import { Item } from "../core/items";
import { ODMEvent } from "../core/events";

export class Coin extends Item {
    kind = 'coin';
    onPickedUp() {
        return this.getEvent();
    }
    getEvent(): ODMEvent {
        return this.eventFactory.create('CoinEvent', this);
    }
}
/*export class Mushroom extends Item {
    kind = 'power_mushroom';
    onPickedUp() {
        return this.getEvent();
    }
    getEvent(): ODMEvent {
        return this.eventFactory.create('empty');
    }
}
export class FireFlower extends Item {
    onPickedUp() {
        return this.getEvent();
    }
    getEvent(): ODMEvent {
        return this.eventFactory.create('empty');
    }
}*/