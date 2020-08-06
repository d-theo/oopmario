import { IRenderer } from "../core/renderer";

// TODO
export class PhaserRenderer {
    private static anims: Phaser.Animations.AnimationManager;
    private static scene;
    private static particles = new Map();
    static bind(scene: Phaser.Scene) {
        PhaserRenderer.anims = scene.anims;
        PhaserRenderer.scene = scene;
    }
    static play(animName:string, sprite) {
        PhaserRenderer.anims.play(animName, sprite);
    }
    static emitParticle(name,nb,x,y) {
        const emitter = PhaserRenderer.particles.get(name);
        emitter.emitParticle(nb,x,y);
    }
    static addParticle(name: string, options: any) {
        const emitter = PhaserRenderer.scene.add.particles(name);
        const e = emitter.createEmitter(options);
        PhaserRenderer.particles.set(name, e);
    }
    static addAnimation(name: string, from: string, options: any) {
        PhaserRenderer.anims.create({
            key: name,
            frames: PhaserRenderer.anims.generateFrameNumbers(from, options.fromFrames),
            frameRate: options.frameRate,
            repeat: -1
        });
    }
}