import { EntityType } from "./entities";

export class StageLoader {
    build(level: string) {
    }
    getTiles(): {kind: EntityType, x: number, y: number}[] {
        const ground = new Array(60).fill(0).map(((x,i) => {
            return {
                kind: 'ground' as EntityType,
                x:i,
                y:0
            }
            })).concat(
            new Array(60).fill(0).map(((x,i) => {
                return {
                    kind: 'ground',
                    x:i,
                    y:1
                }
            }
            ))
       );
        return [
            {kind:'chance' as EntityType,x: 16, y: 5},
            {kind:'chance' as EntityType,x: 21, y: 5},
            {kind:'chance' as EntityType,x: 22, y: 9},
            {kind:'chance' as EntityType,x: 23, y: 5},

            {kind:'brick' as EntityType,x: 20, y: 5},
            {kind:'brick' as EntityType,x: 22, y: 5},
            {kind:'brick' as EntityType,x: 24, y: 0},
        ].concat(ground);
    }
    
    getHero(): {kind: EntityType, x: number, y: number} {
        return {kind: 'mario' as EntityType, x: 10, y: 10};
    }
    getMonsters() {
        return [
            //{2: 36, y: 2, kind: 'mushroom'}
        ];
    }
    getItems() {
        return [];
    }
}

export class LoaderFactory {
    fromFile() {
        return new StageLoader();
    }
}