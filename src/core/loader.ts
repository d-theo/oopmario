export interface IStageLoader {
    build(level: string);
    getTiles();
    getMonsters();
    getItems();
}

export interface ILoaderFactory {
    fromFile(): IStageLoader;
}