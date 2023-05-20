export class Bullet {
    constructor(direction, x, y, speed, size, damage, direction) {
        this.direction = direction;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
        this.damage = damage;
        this.direction = direction;
    }

    move() {
        if (this.direction == directions.up) {
            this.y -= this.speed;
        } else if (this.direction == directions.down) {
            this.y += this.speed;
        } else if (this.direction == directions.left) {
            this.x -= this.speed;
        } else if (this.direction == directions.right) {
            this.x += this.speed;
        }
    }
}