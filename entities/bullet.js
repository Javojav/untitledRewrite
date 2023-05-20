import { directions } from "../constants.js";
import { BulletModel } from "../enviroment/bullet.js";

export class Bullet {
    constructor(x, y, direction ,speed, size, damage, room) {
        this.direction = direction;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
        this.damage = damage;
        this.direction = direction;
        this.room = room;

        this.model = new BulletModel(size);
    }

    display(p5) {
        this.model.display(p5, this.x, this.y);
    }

    checkWallCollision() {
        if (this.x - this.size/2 < this.room.roomPos.x) {
            return true;
        }
        
        if (this.y + this.size*.9 < this.room.roomPos.y) {
            return true;
        }

        if (this.x + this.size/2 > this.room.roomSize.w + this.room.roomPos.x) {
            return true;
        }

        if (this.y + this.size > this.room.roomSize.h + this.room.roomPos.y) {
            return true;
        }
        return false;
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

        return this.checkWallCollision();
    }
}