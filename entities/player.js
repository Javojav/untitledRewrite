import { humanoidEntity } from './humanoidEntity.js';
import { directions } from "../constants.js";

export class Player extends humanoidEntity {

    constructor(x, y, size) {
        super(x, y, size);

    }

    handleInput(p5) {
        if (p5.keyIsDown(p5.UP_ARROW)) {
            this.move(directions.up);
        }
        if (p5.keyIsDown(p5.DOWN_ARROW)) {
            this.move(directions.down);
        }
        if (p5.keyIsDown(p5.LEFT_ARROW)) {
            this.move(directions.left);
        }
        if (p5.keyIsDown(p5.RIGHT_ARROW)) {
            this.move(directions.right);
        }
    }

    checkDoorCollision(doors) {
        for (let i = 0; i < doors.length; i++) {
            if (doors[i].currentX < this.x + this.model.w/2 &&
                doors[i].currentX + doors[i].currentW > this.x + this.model.w/2 &&
                doors[i].currentY < this.y &&
                doors[i].currentY + doors[i].currentH > this.y + this.size) {
                    
                return doors[i].goto;
            }
        }

        return false;
    }
}