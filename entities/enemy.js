import { humanoidEntity } from "./humanoidEntity.js";
import { directions } from "../constants.js";
import { EnemyModel, RandomWalkerEnemyModel, FollowingEnemyModel } from "../enviroment/humanoid.js";

export class StupidFuckingEnemy extends humanoidEntity {
    constructor(x, y, size) {
        super(x, y, size);
        
        this.speed = 4

        this.damage = 1;

        this.model = new EnemyModel(x, y, size);

        this.movingDirection = this.randomDirection();
    }

    randomDirection() {
        const randomDirection = Math.floor(Math.random() * 4); // 0 to 3

        return this.movingDirection = randomDirection;
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
        super(x, y, size);

        this.speed = 6

        this.stepLeftInterval = [10, 30]
        this.stepsLeft = 0;
        this.changeDirection();
        
        this.model = new RandomWalkerEnemyModel(x,y,size)
    } 
    
    changeDirection() {
        this.randomDirection();
        
        this.stepsLeft = Math.floor(Math.random() * this.stepLeftInterval[1] - this.stepLeftInterval[0]) + this.stepLeftInterval[0]; // Random number of steps (between 10 and 29)
    }
    
    update() {
        super.move(this.movingDirection)

        this.stepsLeft--;
        if (this.stepsLeft <= 0 || this.recentCollision) {
            this.changeDirection()
        } 
    } 
}

export class Following extends StupidFuckingEnemy {
    constructor(x, y, size) {
        super(x, y, size);
        
        this.model = new FollowingEnemyModel(x, y, size);
    }

    update(player) {
        let chosenDirection;
       
        this.speed = 2

        const horizontalDistance = player.x - this.x;
        const verticalDistance = player.y - this.y;

        if (Math.abs(horizontalDistance) > Math.abs(verticalDistance) && horizontalDistance != 0) {
            if (horizontalDistance < 0) {
                chosenDirection = directions.left;
            }
            else {
                chosenDirection = directions.right;
            }
        } 
        else {
            if (verticalDistance < 0) {
                chosenDirection = directions.up;
            } 
            else {
                chosenDirection = directions.down;
            }
        }

        super.move(chosenDirection);
    }
}

export class Giant extends RandomWalker {
    constructor(x, y, size) {
        // player colision is broken
        super(x, y, size * 3);
        this.speed = 1;
        this.damage = 2;
        this.maxHealth *= 3;
        this.health = this.maxHealth;
    }
}

export function createEnemy(constructor, x, y, size) {
    return new constructor(x, y, size);
}