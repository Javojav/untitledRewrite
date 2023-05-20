import { Entity } from './entity.js';
import { directions } from "../constants.js";
import { Humanoid } from '../enviroment/humanoid.js';

export class humanoidEntity extends Entity {
    constructor(x, y, size) {
        super(x, y, size);
        this.model = new Humanoid(x, y, size);
        
        this.facing = directions.down;   
    }
    
    move (direction) {
        super.move(direction);
     
        this.facing = direction;
    }

    checkWallCollision() {
        if (this.x - this.model.w/2 < this.room.roomPos.x) {
            return true;
        }
        
        if (this.y + this.size*.9 < this.room.roomPos.y) {
            return true;
        }

        if (this.x + this.model.w/2 > this.room.roomSize.w + this.room.roomPos.x) {
            return true;
        }

        if (this.y + this.size > this.room.roomSize.h + this.room.roomPos.y) {
            return true;
        }
        return false;
    }
}