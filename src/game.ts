import 'phaser';
import { OneDayMario } from './OneDayMario';
import { MoveAction, RestAction, JumpAction } from './content/actions';
function toPix(arg: {x,y}) {
    return {
        x: arg.x*16,
        y: (14 - arg.y) * 16
    };
}
export default class Demo extends Phaser.Scene {
    engine: OneDayMario;
    mario: any;
    mario2: Phaser.Physics.Arcade.Sprite;
    cursors;
    blockEmitter;
    constructor () {
        super('demo');
    }
    preload () {
        this.engine = new OneDayMario();
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
        const map = this.engine.getStage().tilemap;

        const bricks = this.physics.add.group({immovable: true});
        for (let t of map.brick) {
            const pos = toPix(t);
            const sp = this.physics.add.sprite(pos.x, pos.y, 'brick');
            bricks.add(sp);
        }
        const chance = this.physics.add.group({immovable: true});
        for (let t of map.chance) {
            const pos = toPix(t);
            const sp:any = this.physics.add.sprite(pos.x, pos.y, 'chance');
            sp.setBounce(0.3);
            chance.add(sp);
        }
        const ground = this.physics.add.group({immovable: true});
        for (let t of map.ground) {
            const pos = toPix(t);
            const sp = this.physics.add.sprite(pos.x, pos.y, 'ground');
            ground.add(sp);
        }

        this.cameras.main.setBackgroundColor(0x6b8cff);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.mario = this.physics.add.sprite(100, 100, 'mario');
        this.mario.body.setSize(10,16);
        this.mario.setGravityY(400);
        this.physics.add.collider(ground, this.mario, () => this.isOnFloor = true);
        this.physics.add.collider(chance, this.mario, (_mario: Phaser.Physics.Arcade.Sprite, _chance: Phaser.Physics.Arcade.Sprite) => {
            if (_chance.body.touching.down && _mario.body.touching.up) {
                this.add.tween({
                    targets: _chance,
                    duration: 150,
                    ease: "Power1",
                    yoyo: true,
                    y: '-=7',
                    onComplete: () => {
                        const oldTex = _chance.texture;
                        _chance.setTexture('chance-used');
                        if (oldTex.key !== 'chance-used') {
                            const bonus = this.physics.add.sprite(_chance.x, _chance.y-16, 'mushroom');
                            bonus.setAccelerationX(50);
                            bonus.setGravityY(1000);
                            bonus.setMaxVelocity(60, 500);
                            this.physics.add.collider(ground, bonus);
                            this.physics.add.collider(chance, bonus);
                            this.physics.add.collider(bricks, bonus);
                            this.physics.add.overlap(this.mario, bonus, (_mario, _mush) => {
                                _mush.destroy();
                            });
                        }
                    }
                });
            }
        }, (_mario: Phaser.Physics.Arcade.Sprite, _chance: Phaser.Physics.Arcade.Sprite) => {
            const d = Math.abs(_chance.body.x - (_mario.body.x+10));
            if (d <= 3 && _mario.body.y >= _chance.body.y) {
                this.add.tween({
                    targets: _mario,
                    duration: 10,
                    ease: "linear",
                    x: '-='+d,
                });
                return false;
            }

            const pd = Math.abs(_chance.body.x+16 - (_mario.body.x));
            if (pd <= 3 && _mario.body.y >= _chance.body.y) {
                this.add.tween({
                    targets: _mario,
                    duration: 10,
                    ease: "linear",
                    x: '+='+pd,
                });
                return false;
            }
            return true;
        });
        this.physics.add.collider(bricks, this.mario, (_mario:any,_brick:any) => {
            if (_brick.body.touching.down && _mario.body.touching.up) {
                this.add.tween({
                    targets: _brick,
                    duration: 150,
                    ease: "Power1",
                    yoyo: false,
                    y: '-=7',
                    onComplete: () => _brick.destroy()
                });
                this.blockEmitter.emitParticle(6, _brick.x-8, _brick.y-8);
            }
        });

        this.add.text(10,10,''+this.game.loop.actualFps);

        this.mario.setMaxVelocity(100,350);

        this.cameras.main.setBounds(0, 0, 60*16, map.heightInPixels);
		this.cameras.main.startFollow(
            this.mario,
            true,
            1,
            1,
            0,
            100
        );

        this.blockEmitter = this.add.particles('brick-particle');
        this.blockEmitter.createEmitter({
            gravityY: 2500,
            lifespan: 4000,
            speed: 300,
            angle: {
                min: -105,
                max: -70
            },
            frequency: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mario-run', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.game.scale.setZoom(2)

    }
    isOnFloor = false;
    canJump = true;
    currentAnim = '';
    currentAnimSpr;
    onFloor() {
        return this.touchingDown();
    }
    touchingDown() {
        return this.mario.body.touching.down;
    }
    update() {
        const DER = 30;
        const INERTIA = 10;
        if (this.cursors.left.isDown) {
            if (this.onFloor()) {
                if (this.currentAnim !== 'left') {
                    this.mario.flipX= true;
                    this.currentAnimSpr = this.anims.play('right', this.mario);
                    this.currentAnim = 'left'
                }
                // derapage
                if (this.mario.body.velocity.x > DER){
                    this.mario.setVelocityX(DER);
                }
                this.mario.setAccelerationX(-100);
            } else {
                this.mario.setAccelerationX(-100);
            }
        }
        else if (this.cursors.right.isDown) {
            if (this.onFloor()) {
                if (this.currentAnim !== 'right') {
                    this.mario.flipX= false;
                    this.currentAnimSpr = this.anims.play('right', this.mario);
                    this.currentAnim = 'right'
                }
                // derapage
                if (this.mario.body.velocity.x < -DER){
                    this.mario.setVelocityX(-DER);
                }
                this.mario.setAccelerationX(100);
            } else {
                this.mario.setAccelerationX(100);
            }
        } else {
            if (this.onFloor()) {
                this.mario.anims.stop();
                this.currentAnim = '';
                this.mario.setAccelerationX(0);
                const right = this.mario.body.velocity.x > INERTIA ? this.mario.body.velocity.x - 9 : 0;
                const left = this.mario.body.velocity.x < -INERTIA ? this.mario.body.velocity.x + 9 : 0;
                if (right != 0)this.mario.setVelocityX(right);
                else if (left != 0) this.mario.setVelocityX(left);
                else this.mario.setVelocityX(left);
            }
        }

        if (this.cursors.space.isDown && this.canJump) {
            this.mario.setAccelerationY(-2200);
            this.time.delayedCall(130, () => {
                this.mario.setAccelerationY(0)
                this.canJump = false;
            });
        } else {
            this.mario.setAccelerationY(0);
        }
        if (this.onFloor()) {
            this.canJump = true;
            this.mario.setVelocityY(0);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 400,
    height: 17*16,
    scene: Demo,
    physics: {
        default: 'arcade',
        debug: true,
        gravity: { y: 475 },
        /*arcade: {
            debug: true,
            debugShowBody: true,
            debugShowStaticBody: true,
            debugShowVelocity: true,
            debugVelocityColor: 0xffff00,
            debugBodyColor: 0x0000ff,
            debugStaticBodyColor: 0xffffff
        }*/
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
