import {height, width} from '../constants.js';
import { Humanoid } from './humanoid.js';

export class Wall {
    constructor(heightTop, heightBottom, widthLeft, wifthRight) {
        this.heightTop = heightTop;
        this.heightBottom = heightBottom;
        this.widthLeft = widthLeft;
        this.wifthRight = wifthRight;

        this.color = {
            r: 0,
            g: 0,
            b: 0
        };            
    }

    display(p5) {
        //top
        this.horizontalWall(p5, 0, 0, p5.width, this.heightTop);
        
        //bottom
        this.horizontalWall(p5, 0, p5.height - this.heightBottom, p5.width, this.heightBottom);
        
        //left
        this.verticalWall(p5, 0, 0, this.widthLeft, p5.height);
        
        //right
        this.verticalWall(p5, p5.width - this.wifthRight, 0, this.wifthRight, p5.height);
        
        //pattern
        this.pattern(p5);
    }
    
    horizontalWall(p5, x, y, w, h) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.noStroke();
        p5.rect(x, y, w, h);
    }
    
    verticalWall(p5, x, y, w, h) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.noStroke();
        p5.rect(x, y, w, h);
    }

    pattern(p5) {
        this.horizontalPattern(p5, this.widthLeft, 0, p5.width - this.wifthRight, this.heightTop);
        this.horizontalPattern(p5, this.widthLeft, p5.height - this.heightBottom, p5.width - this.wifthRight, this.heightBottom);
        this.verticalPattern(p5, 0, 0, this.widthLeft, p5.height);
        this.verticalPattern(p5, p5.width - this.wifthRight, 0, this.wifthRight, p5.height);
    }

    horizontalPattern(p5, x, y, w, h) {}

    verticalPattern(p5, x, y, w, h) {}
}

export class Brick extends Wall {
    constructor(heightTop, heightBottom, widthLeft, wifthRight) {
        super(heightTop, heightBottom, widthLeft, wifthRight);
        this.brickHeight = 25;
        this.brickWidth = 75;
        
        this.offset = this.brickWidth / 2;

        this.color = {
            r: 125,
            g: 75,
            b: 50
        };

        this.brickStrokeColor = {
            r: 255,
            g: 255,
            b: 255
        };

        this.brickStrokeWeight = 1.2;
    }
    
    horizontalPattern(p5, x, y, w, h) {
        p5.stroke(this.brickStrokeColor.r, this.brickStrokeColor.g, this.brickStrokeColor.b);
        p5.strokeWeight(this.brickStrokeWeight);

        for (let i = y; i < y + h; i += this.brickHeight) {
            //horizontal lines
            p5.line(x, i, w, i);

            //vertical lines
            //it gets initialized to start half a brick width to the left every odd brick
            let brickStart = x + ((this.offset) * (i % 2));
            for (let j = brickStart; j < w; j += this.brickWidth) {
                p5.line(j, i, j, i + this.brickHeight);
            }
        }
    }

    verticalPattern(p5, x, y, w, h) {
        p5.stroke(this.brickStrokeColor.r, this.brickStrokeColor.g, this.brickStrokeColor.b);
        p5.strokeWeight(this.brickStrokeWeight);
        for (let i = y; i < y + h; i += this.brickHeight) {
            //vertical lines
            p5.line(x, i, x + w, i);

            //horizontal lines
            //it gets initialized to start half a brick width to the left every odd brick
            let brickStart = x + ((this.offset) * (i % 2));
            for (let j = brickStart; j < x + w; j += this.brickWidth) {
                p5.line(j, i, j, i + this.brickHeight);
            }
        }
    }
}

export class verticalBrick extends Brick {
    constructor(heightTop, heightBottom, widthLeft, wifthRight) {
        super(heightTop, heightBottom, widthLeft, wifthRight);
    }
    
    verticalPattern(p5, x, y, w, h) {
        p5.stroke(this.brickStrokeColor.r, this.brickStrokeColor.g, this.brickStrokeColor.b);
        p5.strokeWeight(this.brickStrokeWeight);
        for (let i = x; i < x + w; i += this.brickHeight) {
            p5.line(i, y, i, y + h);

            let brickStart = y + ((this.offset) * (i % 2));
            for (let j = brickStart; j < y + h; j += this.brickWidth) {
                p5.line(i, j, i + this.brickHeight, j);
            }
        }
    }
}
    

export class Stone extends Brick {
    constructor(heightTop, heightBottom, widthLeft, wifthRight) {
        super(heightTop, heightBottom, widthLeft, wifthRight);

        this.humanoid = new Humanoid();

        this.color = {
            r: 125,
            g: 125,
            b: 125
        };

        this.brickStrokeColor = {
            r: 0,
            g: 0,
            b: 0
        };

        this.brickWidth = 50;
        this.brickHeight = 12.5;

        this.offset = this.brickWidth;
    }

}

export class Shop extends Brick {
    constructor(heightTop, heightBottom, widthLeft, wifthRight) {
        super(heightTop, heightBottom, widthLeft, wifthRight);
        this.tableHeight = 75;
        this.startShopHeight = 75;

        this.shopKeeper = new Humanoid(width/2, this.heightTop - this.tableHeight * 1.75, this.tableHeight);

        this.tableColor = {
            r: 125,
            g: 75,
            b: 0
        };

        this.backgroundColor = {
            r: 0,
            g: 0,
            b: 0
        };
    }

    display(p5) {
        super.display(p5);

        this.shop(p5)
    }

    shop(p5) {
        p5.fill(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b);
        p5.rect(this.widthLeft, this.startShopHeight, width - this.wifthRight - this.widthLeft , this.heightTop);

        this.shopBackgroundPattern(p5, this.widthLeft, this.startShopHeight, width - this.wifthRight - this.widthLeft , this.heightTop - this.tableHeight - this.startShopHeight);
        
        //humanoid
        this.shopKeeper.display(p5);

        p5.fill(this.tableColor.r, this.tableColor.g, this.tableColor.b);
        p5.rect(this.widthLeft, this.heightTop - this.tableHeight, width - this.wifthRight - this.widthLeft , this.tableHeight);
        
    }

    shopBackgroundPattern(p5, x, y, w, h) {
        p5.textSize(h - 20);
        p5.textAlign(p5.CENTER, p5.TOP);
        p5.fill(0, 125, 0);
        p5.text("🤑", x, y + 15, w, h);
    }
}

export function createWall(constructor, heightTop, heightBottom, widthLeft, wifthRight) {
    return new constructor(heightTop, heightBottom, widthLeft, wifthRight);
}