export class BulletModel {
    constructor(size) {
        this.size = size;

        this.color = {
            r: 0,
            g: 0,
            b: 0
        }
    }
    
    display(p5, x, y) {
        p5.fill(this.color.r, this.color.g, this.color.b);
        p5.noStroke();
        p5.ellipse(x, y, this.size, this.size);
    }
}