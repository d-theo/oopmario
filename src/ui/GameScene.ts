import 'phaser';
import { OneDayMario } from '../core/OneDayMario';
import { MoveAction, RestAction, JumpAction } from '../content/actions';
import { GamePhysics, CollisionStrategy } from '../core/physics';
import { EntityFactory, Mario } from '../content/entities';
import { PhaserPhysics } from '../content/physics';
import {PhaserRenderer } from '../content/renderer';
import { ODMEvent } from '../core/events';
import { Scene, Game } from 'phaser';
import { GameEvent } from '../content/events';
import { BrickTile, ChanceTile } from '../content/tiles';
import { MovableEntity } from '../core/entity';
import { GameEffects } from './GameEffects';

export default class GameScene extends Phaser.Scene {
    engine: OneDayMario;
    mario: Mario;
    mario2: Phaser.Physics.Arcade.Sprite;
    cursors;
    blockEmitter;
    effects: GameEffects;
    constructor () {
        super('GameScene');
    }
    preload () {
        this.load.image('map', '/assets/MB.png');
        this.load.image('brick', '/assets/brick.png');
        this.load.image('chance', '/assets/chance.png');
        this.load.image('ground', '/assets/ground.png');
        this.load.image('mario', '/assets/noob.png');
        this.load.image('brick-particle', '/assets/brick-particle.png');
        this.load.image('chance-used', '/assets/chance-used.png');
        this.load.image('mushroom', '/assets/mushroom.png');
        this.load.spritesheet('mario-run', '/assets/mario.png', { frameWidth: 16, frameHeight: 16 });
    }
    create () {
        this.effects = new GameEffects(this);
        const physics = new PhaserPhysics();
        physics.bind(this.physics);
        PhaserRenderer.bind(this);
        CollisionStrategy.bind(this);

        this.engine = new OneDayMario(
            physics,
            new EntityFactory(this),
        );
        
        this.engine.buildStage('1-1');
        
        this.cameras.main.setBackgroundColor(0x6b8cff);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.mario = this.engine.mario as Mario;

        this.cameras.main.setBounds(0, 0, 60*16, 17*16);
        this.cameras.main.startFollow(
            this.mario.getBody(),
            true,
            1,
            1,
            0,
            100
        );

        PhaserRenderer.addParticle('brick-particle',{
            gravityY: 2500,
            lifespan: 4000,
            speed: 300,
            angle: {
                min: -105,
                max: -70
            },
            frequency: -1
        });

        PhaserRenderer.addAnimation('right', 'mario-run',{
            fromFrames:  { start: 0, end: 1 },
            frameRate: 10
        });

        this.game.scale.setZoom(2)
    }

    update() {
        if (this.cursors.left.isDown) {
            this.engine.setAction(new MoveAction(this.mario, 'left'));
        } else if (this.cursors.right.isDown) {
            this.engine.setAction(new MoveAction(this.mario, 'right'));
        } else {
            this.engine.setAction(new RestAction(this.mario));
        }
        if (this.cursors.space.isDown) {
            this.engine.setAction(new JumpAction(this.mario));
        }

        const updated = this.engine.update();
        if (updated.hasEvents) {
            updated.events.forEach(e => this.effects.play(e))
        }
    }
}