import { humanoidEntity } from './humanoidEntity.js';
import { directions,keys } from "../constants.js";
import * as items from './item.js';  

export class Player extends humanoidEntity {

    constructor(x, y, size) {
        super(x, y, size);

        this.health = 3;

        this.inventory = {
            items: [],
            maxItems: 2,
            holding: 0
        };
        this.inventory.items = [new items.Pistol(this.size), null];
    }

    handleInput(p5) {
    
        if (p5.keyIsDown(keys.up)) {
            this.move(directions.up);
        }
        if (p5.keyIsDown(keys.down)) {
            this.move(directions.down);
        }
        if (p5.keyIsDown(keys.left)) {
            this.move(directions.left);
        }
        if (p5.keyIsDown(keys.right)) {
            this.move(directions.right);
        }
        if (p5.keyIsDown(keys.shoot)) {
            this.inventory.items[this.inventory.holding].shoot();
        }
        if (p5.keyIsDown(keys.reload)) {
            this.inventory.items[this.inventory.holding].reload();
        }
        if (p5.keyIsDown(keys.item1)) {
            this.inventory.holding = 0;
        }
        if (p5.keyIsDown(keys.item2)) {
            this.inventory.holding = 1;
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