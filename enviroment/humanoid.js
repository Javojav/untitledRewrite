import { directions } from "../constants.js";



export class Humanoid {
    constructor(x, y, h) {
        this.h = h;
        this.w = h*0.45;
        /*
        I fucked up so i have to convert some coordinates 
        because i spend way to much time doing it wrong and i am not fixing more stuff here
        */
        this.x = x - this.w/2;
        this.y = y;
        this.facing = directions.down;

        this.defaultColor = {
            r: 255,
            g: 255,
            b: 255
        };

        // Fills array with default values
        this.headConfig = new Array(4).fill().map(() => ({ 
            x: this.x + this.w / 2,
            y: this.y + (this.h*.45) / 2,
            size: this.h * .45,
            color: this.defaultColor,
            eyesize: (this.h * .45) / 6,
            lefteyecolor: {
                r: 0,
                g: 0,
                b: 0
            },
            righteyecolor: {
                r: 0,
                g: 0,
                b: 0
            }
        }));
        
        
        // Sets cusom values for each direction
        this.headConfig[directions.up].lefteyecolor = this.headConfig[directions.up].color;
        this.headConfig[directions.up].righteyecolor = this.headConfig[directions.up].color;
        
        this.headConfig[directions.left].righteyecolor = this.headConfig[directions.left].color;
        
        this.headConfig[directions.right].lefteyecolor = this.headConfig[directions.right].color;
        
        const directionKeys = Object.keys(directions);

        this.neckConfig = new Array(directionKeys.length).fill().map((_, index) => ({
            x: this.headConfig[directions[directionKeys[index]]].x,
            y: this.headConfig[directions[directionKeys[index]]].y + this.headConfig[directions[directionKeys[index]]].size / 2,
            size: this.h * .05,
            width: 2,
            color: this.defaultColor,
        }));

        this.bodyConfig = new Array(directionKeys.length).fill().map((_, index) => ({
            x: this.x,
            y: this.neckConfig[directions[directionKeys[index]]].y + this.neckConfig[directions[directionKeys[index]]].size,
            h: this.h * .35,
            w: this.w / 2,
            color: this.defaultColor,
        }));

        this.bodyConfig[directions.left].w = this.w / 3;
        this.bodyConfig[directions.right].w = this.bodyConfig[directions.left].w;

        this.legsConfig = new Array(directionKeys.length).fill().map((_, index) => ({
            x: this.headConfig[directions[directionKeys[index]]].x,
            y: this.bodyConfig[directions[directionKeys[index]]].y + this.bodyConfig[directions.down].h,
            h: this.h * .15,
            spearationTop: this.bodyConfig[directions[directionKeys[index]]].w / 4,
            spearationBottom: this.bodyConfig[directions[directionKeys[index]]].w / 4,
            width: 2,
            color: this.defaultColor,
        }));

        this.legsConfig[directions.left].spearationBottom = this.bodyConfig[directions.left].w / 2;
        this.legsConfig[directions.right].spearationBottom = this.bodyConfig[directions.left].w /2;

        this.armsConfig = new Array(directionKeys.length).fill().map((_, index) => ({
            x: this.headConfig[directions[directionKeys[index]]].x,
            y: this.bodyConfig[directions[directionKeys[index]]].y + this.bodyConfig[directions[directionKeys[index]]].h / 3,
            endX: this.headConfig[directions[directionKeys[index]]].x,
            endY : this.bodyConfig[directions[directionKeys[index]]].y + this.bodyConfig[directions[directionKeys[index]]].h / 3,
            width: 2,
            color: this.defaultColor
        }));

        this.armsConfig[directions.left].endX = this.armsConfig[directions.left].x - this.w * 0.35;
        this.armsConfig[directions.right].endX = this.armsConfig[directions.right].x + this.w * 0.35;
    }

    display(p5) {
        //p5.fill(255, 0, 0);
        //p5.rect(this.x, this.y, this.w, this.h);
        
        this.neck(p5);
        this.legs(p5, this.x, this.y, this.w, this.h);
        this.head(p5);
        this.body(p5, this.x, this.y, this.w, this.h);
        this.arms(p5, this.x, this.y, this.w, this.h);
    }

    head(p5) {
        p5.noStroke()
        p5.fill(this.headConfig[this.facing].color.r, this.headConfig[this.facing].color.g, this.headConfig[this.facing].color.b);
        p5.ellipse(this.headConfig[this.facing].x, this.headConfig[this.facing].y, this.headConfig[this.facing].size, this.headConfig[this.facing].size);
        p5.fill(this.headConfig[this.facing].lefteyecolor.r, this.headConfig[this.facing].lefteyecolor.g, this.headConfig[this.facing].lefteyecolor.b);
        p5.ellipse(this.headConfig[this.facing].x - this.headConfig[this.facing].size / 5, this.headConfig[this.facing].y - this.headConfig[this.facing].size/10, this.headConfig[this.facing].eyesize, this.headConfig[this.facing].eyesize);
        p5.fill(this.headConfig[this.facing].righteyecolor.r, this.headConfig[this.facing].righteyecolor.g, this.headConfig[this.facing].righteyecolor.b);
        p5.ellipse(this.headConfig[this.facing].x + this.headConfig[this.facing].size / 5, this.headConfig[this.facing].y - this.headConfig[this.facing].size/10, this.headConfig[this.facing].eyesize, this.headConfig[this.facing].eyesize);
    }

    neck(p5) {
        p5.strokeWeight(this.neckConfig[this.facing].width);
        p5.stroke(this.neckConfig[this.facing].color.r, this.neckConfig[this.facing].color.g, this.neckConfig[this.facing].color.b);
        p5.line(this.neckConfig[this.facing].x, this.neckConfig[this.facing].y , this.neckConfig[this.facing].x, this.neckConfig[this.facing].y + this.neckConfig[this.facing].size);
    }
    
    body(p5) {
        p5.noStroke()
        p5.fill(this.bodyConfig[this.facing].color.r, this.bodyConfig[this.facing].color.g, this.bodyConfig[this.facing].color.b);
        p5.rect(this.bodyConfig[this.facing].x + this.w/2 - this.bodyConfig[this.facing].w/2 , this.bodyConfig[this.facing].y, this.bodyConfig[this.facing].w, this.bodyConfig[this.facing].h);
    }
    
    legs(p5, x, y, w, h) {
        p5.stroke(this.legsConfig[this.facing].color.r, this.legsConfig[this.facing].color.g, this.legsConfig[this.facing].color.b);
        p5.strokeWeight(this.legsConfig[this.facing].width);
        p5.line(this.legsConfig[this.facing].x - this.legsConfig[this.facing].spearationTop, this.legsConfig[this.facing].y, this.legsConfig[this.facing].x - this.legsConfig[this.facing].spearationBottom, this.legsConfig[this.facing].y + this.legsConfig[this.facing].h);
        p5.line(this.legsConfig[this.facing].x + this.legsConfig[this.facing].spearationTop, this.legsConfig[this.facing].y, this.legsConfig[this.facing].x + this.legsConfig[this.facing].spearationBottom, this.legsConfig[this.facing].y + this.legsConfig[this.facing].h);
    }

    arms(p5) {
        p5.stroke(this.armsConfig[this.facing].color.r, this.armsConfig[this.facing].color.g, this.armsConfig[this.facing].color.b);
        p5.strokeWeight(this.armsConfig[this.facing].width);
        p5.line(this.armsConfig[this.facing].x, this.armsConfig[this.facing].y, this.armsConfig[this.facing].endX, this.armsConfig[this.facing].endY);    
    }
}