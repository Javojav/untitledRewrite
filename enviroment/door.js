import { width, height } from '../constants.js';
import { DoorLogic } from '../entities/door.js';

export class Door extends DoorLogic {
    constructor (dataDoor, roomPos, roomSize) {
        super(dataDoor, roomPos, roomSize);

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
        p5.noStroke();
        if (this.open) {
            p5.fill(this.color.open.r, this.color.open.g, this.color.open.b);
        }
        else {
            p5.fill(this.color.closed.r, this.color.closed.g, this.color.closed.b);
        }

        p5.rect(this.currentX, this.currentY, this.currentW, this.currentH);

        this.pattern(p5);
    }

    pattern(p5) {}
}

export class ShopDoor extends Door {
    constructor (dataDoor, roomPos, roomSize) {
        super(dataDoor, roomPos, roomSize);

        this.color = {
            closed: this.color.closed,
            open: {
                r: 100,
                g: 0,
                b: 0
            }
        };
        this.patternSize = 64;
    }

    pattern(p5) {
        if (this.open) {
            p5.textSize(this.patternSize);
            p5.fill(255);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text('🤑', this.currentX + this.currentW/2 , this.currentY + this.currentH/2);
        }
    }
}

export function createDoor(constructor, dataDoor, roomPos, roomSize) {
    return new constructor(dataDoor, roomPos, roomSize);
}