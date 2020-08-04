import {Stage} from './stage';
import { ILoaderFactory } from './loader';

export class Content {
    points: number = 0;
    level: string;
    lifes: number = 3;
    stage: Stage;
    loaderFactory: ILoaderFactory;
    constructor(loaderFactory: ILoaderFactory) {
        this.loaderFactory = loaderFactory;
        this.level = '1-1';
        this.build();
    }
    build() {
        this.stage = new Stage(this.loaderFactory.fromFile(), this.level);
    }
}