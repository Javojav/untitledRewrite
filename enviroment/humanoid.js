export class Humanoid {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = h*0.4;

        this.color = {
            r: 255,
            g: 255,
            b: 255
        };

        this.strokeColor = {
            r: 0,
            g: 0,
            b: 0
        };

        this.strokeWeight = 1;
    }

    display(p5) {
        p5.fill(255, 0, 0);
        p5.stroke(this.strokeColor.r, this.strokeColor.g, this.strokeColor.b);
        p5.strokeWeight(this.strokeWeight);
        p5.rect(this.x, this.y, this.w, this.h);

        this.head(p5, this.x, this.y, this.w, this.h);
        this.neck(p5, this.x, this.y, this.w, this.h);
        this.body(p5, this.x, this.y, this.w, this.h);
        this.legs(p5, this.x, this.y, this.w, this.h);
        this.arms(p5, this.x, this.y, this.w, this.h);
    }

    head(p5, x, y, w, h) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.ellipse(x + w / 2, y + (h*.4)/2, h * .4, h *.4);
    }

    neck(p5, x, y, w, h) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.line(x + w / 2, y + (h*.4) , x + w / 2, y + (h * .47));
    }

    body(p5, x, y, w, h) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.rect(x + (h*0.20)/2, y + (h * .47), h*0.20, h*0.28);
    }

    legs(p5, x, y, w, h) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.line(x + w / 4 +5, y + (h * .75), x + w / 4 + 5, y + h);
        p5.line(x + w - w / 4, y + h, x + w - w / 4, y + h + h / 4);
        
        
    }

    arms(p5, x, y, w, h) {}
}