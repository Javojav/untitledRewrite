import { Entity } from './entity.js';
import { directions } from "../constants.js";
import { Humanoid } from '../enviroment/humanoid.js';

export class humanoidEntity extends Entity {
    constructor(x, y, size) {
        super(x, y, size);
        this.invulnerable = false;
        this.invulnerabilityTime = 0;
        
        this.model = new Humanoid(x, y, size);
        
        this.health = 3;
        this.maxHealth = 3;

        this.facing = directions.down;

        this.dead = false;
    }
    
    move (direction) {
        super.move(direction);

        this.facing = direction;
    }

    checkWallCollision() {
        this.recentCollision = false;

        if (this.x - this.model.w/2 < this.room.roomPos.x) {
            this.recentCollision = true;
        }
        
        if (this.y + this.size*.9 < this.room.roomPos.y) {
            this.recentCollision = true;
        }
        
        if (this.x + this.model.w/2 > this.room.roomSize.w + this.room.roomPos.x) {
            this.recentCollision = true;
        }
        
        if (this.y + this.size > this.room.roomSize.h + this.room.roomPos.y) {
            this.recentCollision = true;
        }
        
        return this.recentCollision;
    }

    takeDamage(damage) {
        if (this.invulnerable) {
            return;
        }
        
        this.health -= damage;
        
        if (this.invulnerabilityTime > 0) {
            this.invulnerable = true;
            
            setTimeout(() => {
                this.invulnerable = false;
            } , this.invulnerabilityTime * 1000);
        }

        if (this.health <= 0) {
            this.die();
        }
    }   

    die() {
        this.dead = true;
    }
}