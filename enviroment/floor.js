export class Floor {
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;  

        this.color = {
            r: 255,
            g: 255,
            b: 255
        };
    }
    
    display(p5) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.rect(this.x, this.y, this.w, this.h);

        this.floorPattern(p5, this.x, this.y, this.w, this.h);
    }

    floorPattern(p5, x, y, w, h) {}
}

export class Concrete extends Floor {
    constructor (x, y, w, h) {
        super(x, y, w, h);
        this.color = {
            r: 125,
            g: 125,
            b: 125
        };
    }
}

export class Wood extends Floor {
    constructor (x, y, w, h) {
        super(x, y, w, h);
        this.color = {
            r: 153,
            g: 102,
            b: 51
        };
        
        this.plankHeight = 25;
        this.plankWidth = 75; 
        this.offset = this.plankWidth / 3;
        this.strokeColor = {
            r: 0,
            g: 0,
            b: 0
        };
    }
    
    floorPattern(p5) {        
        p5.stroke(0);
        
        for (let i = this.y; i < this.y + this.h; i += this.plankHeight) {
            p5.line(this.x, i, this.w + this.x , i);
    
            let plankStart = this.x + ((this.offset) * (i % 3));
            for (let j = plankStart; j < this.x + this.w; j += this.plankWidth) {
                p5.line(j, i, j, i + this.plankHeight);
    
            }
        }
    
    }

}

export function createFloor(constructor, x, y, w, h) {
    return new constructor(x, y, w, h);
}