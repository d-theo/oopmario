import GameScene from "./ui/GameScene";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 400,
    height: 17*16,
    scene: GameScene,
    physics: {
        default: 'arcade',
        debug: true,
        gravity: { y: 475 },
    }
};

const game = new Phaser.Game(config);