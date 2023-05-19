import { directions } from "../constants.js";

export class Item {
    constructor(size) {
        this.size = size;

        this.color = {
            r: 0,
            g: 0,
            b: 0
        }
    }
    display(p5, x, y, facing) {
        if (facing == directions.up) {
            this.up(p5, x, y);
        }
        else if (facing == directions.down) {
            this.down(p5, x, y);
        } else if (facing == directions.left) {
            this.left(p5, x, y);
        } else if (facing == directions.right) {
            this.right(p5, x, y);
        }
    }

    up(p5, x, y) {}

    down(p5, x, y) {}

    left(p5, x, y) {}

    right(p5, x, y) {}
}

export class Gun extends Item {
    constructor() {
        super();

    }

    right(p5, x, y) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.rect(x, y - this.size*0.02, this.size*0.02, this.size*0.05);
        // p5.rect(x, y - this.size*0.2, this.size*0.5, this.size*0.2);
    }
    
    left(p5, x, y) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.rect(x - 10, y + 10, 20, 10);
        p5.rect(x, y, 10, 30);
    }

}