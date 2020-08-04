import 'phaser';
import { OneDayMario } from './OneDayMario';
import { MoveAction, RestAction, JumpAction } from './content/actions';

export default class Demo extends Phaser.Scene {
    layer: Phaser.Tilemaps.DynamicTilemapLayer;
    engine: OneDayMario;
    mario: any;
    mario2: Phaser.Physics.Arcade.Sprite;
    cursors;
    constructor () {
        super('demo');
    }
    preload () {
        this.engine = new OneDayMario();
        this.load.image('map', '/assets/MB.png');
        this.load.image('mario', '/assets/noob.png');
    }
    create () {
        var map: Phaser.Tilemaps.Tilemap = this.make.tilemap({
			data: this.engine.getStage().tilemap,
            key: 'map',
            tileHeight: 16,
            tileWidth: 16
        });
        var tileset: Phaser.Tilemaps.Tileset = map.addTilesetImage('map', 'map', 16, 16);
        this.layer = map.createDynamicLayer(0, tileset, 0, 0);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.mario = this.physics.add.sprite(100, 100, 'mario');
        this.mario.setBounce(0.2);
        this.mario.setGravityY(475);
        this.mario.setCollideWorldBounds(true);
        this.layer.setCollisionByExclusion([7]);
        this.physics.add.collider(this.layer, this.mario);

        this.mario.setMaxVelocity(200,500);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.startFollow(this.mario, false);
    }
    update() {
        if (this.cursors.left.isDown) {
            this.mario.setAccelerationX(-100);
        }
        else if (this.cursors.right.isDown) {
            this.mario.setAccelerationX(100);
        } else {
            this.mario.setAccelerationX(0);
            const right = this.mario.body.velocity.x > 10 ? this.mario.body.velocity.x - 5 : 0;
            const left = this.mario.body.velocity.x < -10 ? this.mario.body.velocity.x + 5 : 0;
            if (right != 0)this.mario.setVelocityX(right);
            else if (left != 0) this.mario.setVelocityX(left);
            else this.mario.setVelocityX(left);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 400,
    height: 300,
    scene: Demo,
    physics: {
        default: 'arcade',
        debug: true,
        gravity: { y: 475 },
    }
};

const game = new Phaser.Game(config);





/*
    update() {
        let resting = true;
        if (this.cursors.left.isDown) {
            this.engine.setAction(
                new MoveAction(this.engine.getStage().mario)
            );
            resting = false;
        }
        else if (this.cursors.right.isDown) {
            this.engine.setAction(
                new MoveAction(this.engine.getStage().mario)
            );
            resting = false;
        }
        if ((this.cursors.space.isDown || this.cursors.up.isDown)) {
            this.engine.setAction(
                new JumpAction(this.engine.getStage().mario)
            );
        }

        if (resting) {
            this.engine.setAction(
                new RestAction(this.engine.getStage().mario)
            )
        }

        this.mario.body.setVelocityY(this.engine.getStage().mario.velocityY);
        console.log(this.engine.getStage().mario.gravity + this.engine.getStage().mario.velocityY);
        this.mario.body.setVelocityX(this.engine.getStage().mario.velocityX);
    }
}
*/
