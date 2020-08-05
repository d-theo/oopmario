export class StageLoader {
    build(level: string) {
    }
    getTiles(): any {
        return {
            chance: [
                {kind:'chance',x: 16, y: 5},
                {kind:'chance',x: 21, y: 5},
                {kind:'chance',x: 22, y: 9},
                {kind:'chance',x: 23, y: 5},
            ],
            brick: [
                {kind:'brick',x: 20, y: 5},
                {kind:'brick',x: 22, y: 5},
                {kind:'brick',x: 24, y: 0},
            ],
            ground: new Array(60).fill(0).map(((x,i) => {
                return {
                    x:i,
                    y:0
                }
                })).concat(
                new Array(60).fill(0).map(((x,i) => {
                    return {
                        x:i,
                        y:1
                    }
                }
                ))
           )
        }
    }
    getMonsters() {
        return [
            {2: 36, y: 2, kind: 'mushroom'}
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