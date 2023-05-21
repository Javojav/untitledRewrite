import { directions } from "../constants.js";

export class Item {
    constructor(size) {
        this.size = size;

        this.color = {
            r: 0,
            g: 0,
            b: 0
        }

        this.lastPosition = {
            x: 0,
            y: 0
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

        this.lastPosition.x = x;
        this.lastPosition.y = y;
    }

    getLastPosition() {
        return this.lastPosition;
    }

    up(p5, x, y) {}

    down(p5, x, y) {}

    left(p5, x, y) {}

    right(p5, x, y) {}
}

export class Pistol extends Item {
    constructor(size) {
        super(size);
    }

    right(p5, x, y) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.rect(x, y - this.size*0.02, this.size*0.02, this.size*0.05);
        p5.rect(x, y - this.size*0.03, this.size*0.10, this.size*0.01);
    }
    
    left(p5, x, y) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.rect(x - this.size*0.02, y - this.size*0.02, this.size*0.02, this.size*0.05);
        p5.rect(x - this.size*0.10, y - this.size*0.03, this.size*0.10, this.size*0.01);
    }
}

export class AutoRifle extends Pistol {
    constructor(size) {
        super(size);
    }

    right(p5, x, y) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.rect(x, y - this.size*0.02, this.size*0.02, this.size*0.05);
        p5.rect(x, y - this.size*0.03, this.size*0.10, this.size*0.01);
        p5.rect(x, y - this.size*0.01, this.size*0.10, this.size*0.01);
    }

    left(p5, x, y) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.rect(x - this.size*0.02, y - this.size*0.02, this.size*0.02, this.size*0.05);
        p5.rect(x - this.size*0.10, y - this.size*0.03, this.size*0.10, this.size*0.01);
        p5.rect(x - this.size*0.10, y - this.size*0.01, this.size*0.10, this.size*0.01);
    }
}