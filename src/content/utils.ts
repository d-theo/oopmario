export function toPix(arg: {x,y}) {
    return {
        x: arg.x*16,
        y: (14 - arg.y) * 16
    };
}

export function fromPix(arg: {x,y}) {
    return {
        x: arg.x/16,
        y: 14 - (arg.y / 16)
    }
}