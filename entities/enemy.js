import { humanoidEntity } from "./humanoidEntity.js";
import { directions } from "../constants.js";
import { EnemyModel } from "../enviroment/humanoid.js";

export class StupidFuckingEnemy extends humanoidEntity {
    constructor(x, y, size) {
        super(x, y, size);
        
        this.damage = 1;

        this.model = new EnemyModel(x, y, size);

        this.movingDirection = directions.down;
    }

    changeDirection() {
        const randomDirection = Math.floor(Math.random() * 4); // 0 to 3

        this.movingDirection = randomDirection;
    }

    update() {
        this.move(this.movingDirection);

        if (this.recentCollision) {
            switch (this.movingDirection) {
                case directions.down:
                    this.movingDirection = directions.up;
                    break;
                case directions.up:
                    this.movingDirection = directions.down;
                    break;
                case directions.left:
                    this.movingDirection = directions.right;
                    break;
                case directions.right:
                    this.movingDirection = directions.left;
                    break;
                default:
                    break;
            }
        }
    }

    checkBulletCollision(bullet) {
        if (bullet.x > this.x - this.model.w/2 - bullet.size/2 && bullet.x < this.x + this.model.w/2 + bullet.size/2) {
            if (bullet.y > this.y - bullet.size/2 && bullet.y < this.y + this.size + bullet.size/2) {
                return true;
            }
        }
        
        return false;
    }
}

export class RandomWalker extends StupidFuckingEnemy {
    constructor(x, y, size) {
        super(x. y, size);

        this.stepLeftInterval = [10, 30]
        this.stepsLeft = 0;
        this.movingDirection = this.changeDirection();
        
    } 

    changeDirection() {
        super.changeDirection()

        this.stepsLeft = Math.floor(Math.random() * this.stepLeftInterval[1] - this.stepLeftInterval[0]) + this.stepLeftInterval[0]; // Random number of steps (between 10 and 29)
    }

    update() {
        super.move()

        if (this.stepsLeft <= 0) {
            this.changeDirection()
        } 
    } 

}

export function createEnemy(constructor, x, y, size) {
    return new constructor(x, y, size);
}