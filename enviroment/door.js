import { width, height,directions } from '../constants.js';
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

export class ReturnDoor extends Door {
    constructor (dataDoor, roomPos, roomSize) {
        super(dataDoor, roomPos, roomSize);
        
        this.color = {
            closed: this.color.closed,
            open: {
                r: 0,
                g: 0,
                b: 100
            }
        };
    }

    pattern(p5) {
        if (this.open) {
            p5.textSize(this.patternSize);
            p5.fill(255);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text('↪', this.currentX + this.currentW/2 , this.currentY + this.currentH/2);
        }
    }
}


export class ArrowDoor extends Door {
    constructor (dataDoor, roomPos, roomSize) {
        super(dataDoor, roomPos, roomSize);
        
        this.color = {
            closed: this.color.closed,
            open: {
                r: 0,
                g: 100,
                b: 0
            }
        };

        this.rotation = 0;

        this.patternSize = 64;
    }
    
    pattern(p5) {
        switch (this.dataDoor.position.direction) {
            case directions.up:
                this.rotation = p5.PI;
                break;
            case directions.down:
                this.rotation = 0;
                break;
            case directions.left:
                this.rotation = p5.PI / 2;
                break;
            case directions.right:
                this.rotation = 3 * p5.PI / 2;
                break;
        }

        if (this.open) {
            //circle arrow
            p5.push();
            p5.translate(this.currentX + this.currentW/2, this.currentY + this.currentH/2);
            p5.rotate(this.rotation);
            p5.fill(255);
            p5.triangle(-this.patternSize/2, 0, this.patternSize/2, 0, 0, this.patternSize/2);
            p5.pop();
        }
    }
}


export function createDoor(constructor, dataDoor, roomPos, roomSize) {
    return new constructor(dataDoor, roomPos, roomSize);
}