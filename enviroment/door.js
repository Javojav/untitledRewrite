import { width, height } from '../constants.js';

const defaultSizes = {
    horizontal : {
        open: {
            w: 200,
            h: 25
        },
        closed: {
            w: 200,
            h: 7
        },
    }, 
    vertical: {
        open: {
            w: 25,
            h: 200
        },
        closed: {
            w: 7,
            h: 200
        },
    }
}

export const defaultPositions = {
    top: {
        open: defaultSizes.horizontal.open,
        closed: defaultSizes.horizontal.closed,
        x: 0,
        y: 0,
        centerX: true,
        centerY: false,
        defaultOpen: false
    }, 
    bottom: {
        open: defaultSizes.horizontal.open,
        closed: defaultSizes.horizontal.closed,
        centerX: true,
        centerY: false,
        x: 0,
        y: -0.1,
        defaultOpen: false
    },
    left: {
        open: defaultSizes.vertical.open,
        closed: defaultSizes.vertical.closed,
        centerX: false,
        centerY: true,
        x: 0,
        y: 0,
        defaultOpen: false
    },
    right: {
        open: defaultSizes.vertical.open,
        closed: defaultSizes.vertical.closed,
        centerX: false,
        centerY: true,
        x: -0.1,
        y: 0,
        defaultOpen: false
    }

}

export class Door {
    constructor (dataDoor, roomPos, roomSize) {
        this.position = dataDoor.position;
        this.roomSize = roomSize;
        this.roomPos = roomPos;
        this.goto = dataDoor.goto;
        
        this.open = dataDoor.defaultOpen === undefined ? dataDoor.position.defaultOpen : dataDoor.defaultOpen;

        if (this.position.x < 0){
            this.position.x =  this.roomSize.w + this.position.x;
            this.negativeX = true;
        }

        if (this.position.y < 0){
            this.position.y =  this.roomSize.h + this.position.y;
            this.negativeY = true;
        }

        this.x = this.position.centerX 
        ? this.roomPos.x + (roomSize.w / 2)
        : this.roomPos.x + this.position.x;

        this.y = this.position.centerY
        ? this.roomPos.y + (roomSize.h / 2)
        : this.roomPos.y + this.position.y;

        this.color = {
            closed: {
                r: 0,
                g: 0,
                b: 0
            }, 
            open: {
                r: 255,
                g: 255,
                b: 255
            }
        }
    }

    display(p5) {
        
        if (this.open) {
            let x = this.position.centerX ? this.x - (this.position.open.w/ 2)  : this.x;
            let y = this.position.centerY ? this.y - (this.position.open.h/ 2)  : this.y;
            
            console.log(this.position.x, this.position.y)
            if (this.negativeX) {
                x = x - this.position.open.w;
            }
            
            if (this.negativeY) {
                y = y - this.position.open.h;
            }
            
            p5.noStroke();
            p5.fill(this.color.open.r, this.color.open.g, this.color.open.b);
            p5.rect(x, y, this.position.open.w, this.position.open.h);
        } else {
            let x = this.position.centerX ? this.x - (this.position.closed.w / 2) : this.x;
            let y = this.position.centerY ? this.y - (this.position.closed.h / 2) : this.y;

            if (this.negativeX) {
                x = x - this.position.closed.w;
            }

            if (this.negativeY) {
                y = y - this.position.closed.h;
            }

            p5.fill(this.color.closed.r, this.color.closed.g, this.color.closed.b);
            p5.noStroke();
            p5.rect(x, y, this.position.closed.w, this.position.closed.h);
        }
    }
}

export function createDoor(constructor, dataDoor, roomPos, roomSize) {
    return new constructor(dataDoor, roomPos, roomSize);
}