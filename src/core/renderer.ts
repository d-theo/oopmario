export interface IRenderer {
    anims: Phaser.Animations.AnimationManager;
    scene;
    particles:Map<string, any>;
    bind();
    play(animName:string, sprite);
    addParticle(name: string, options: any);
    addAnimation(name: string, from: string, options: any) 
}