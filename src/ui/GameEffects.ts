import { ODMEvent } from "../core/events";
import { BrickTile, ChanceTile } from "../content/tiles";
import { MovableEntity } from "../core/entity";
import { PhaserRenderer } from "../content/renderer";

export class GameEffects {
    constructor(private readonly scene: Phaser.Scene) {}
    play(event: ODMEvent) {
        switch (event.type) {
            case 'BrickBounce': return this.brickBounce(event.actor as BrickTile);
            case 'BrickBreak': return this.brickBreak(event.actor as BrickTile);
            case 'ChancePop'  : return this.chancePop(event.actor as ChanceTile);
            case 'DeviateRight'  : return this.deviateRight(event.actor as MovableEntity, event.args);
            case 'DeviateLeft'  : return this.deviateLeft(event.actor as MovableEntity, event.args);
            case 'BounceUp'  : return this.bounceUp(event.actor as MovableEntity);
            default: throw new Error('[GameEffects=>play] not implemented '+event.type);
        }
    }
    chancePop(actor: ChanceTile) {
        this.scene.add.tween({
            targets: actor.sprite,
            duration: 150,
            ease: "Power1",
            yoyo: true,
            y: '-=7',
        });
    }
    deviateRight(actor: MovableEntity, by: number) {
        this.scene.add.tween({
            targets: actor.sprite,
            duration: 10,
            ease: "linear",
            x: '+='+by,
        });
    }
    deviateLeft(actor: MovableEntity, by: number) {
        this.scene.add.tween({
            targets: actor.sprite,
            duration: 10,
            ease: "linear",
            x: '-='+by,
        });
    }
    brickBreak(brick: BrickTile) {
        PhaserRenderer.emitParticle('brick-particle', 6, brick.sprite.x-8, brick.sprite.y-8);
    }
    brickBounce(brick: BrickTile) {
        this.scene.add.tween({
            targets: brick.sprite,
            duration: 150,
            ease: "Power1",
            yoyo: false,
            y: '-=7',
        });
    }
    bounceUp(actor: MovableEntity) {
        this.scene.add.tween({
            targets: actor.sprite,
            duration: 100,
            ease: "Power1",
            yoyo: false,
            y: '-=16',
        });
    }
}