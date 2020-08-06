import {Stage} from './stage';
import { ILoaderFactory } from './loader';
import { EntityFactory } from '../content/entities';

export class Content {
    points: number = 0;
    level: string;
    lifes: number = 3;
    stage: Stage;
    loaderFactory: ILoaderFactory;
    constructor(loaderFactory: ILoaderFactory, private readonly entityFactory: EntityFactory) {
        this.loaderFactory = loaderFactory;
    }
    setLevel(level: string) {
        this.level = level;
    }
    buildStage() {
        this.stage = new Stage(
            this.loaderFactory.fromFile(),
            this.level,
            this.entityFactory
        );
        this.stage.build();
    }
}