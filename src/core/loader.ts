import { EntityType } from "../content/entities";

type Things = {kind: EntityType, x: number, y: number};

export interface IStageLoader {
    build(level: string);
    getTiles(): any;
    getMonsters(): Things[];
    getItems(): Things[];
    getHero(): Things;
}

export interface ILoaderFactory {
    fromFile(): IStageLoader;
}