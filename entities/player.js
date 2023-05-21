import { humanoidEntity } from './humanoidEntity.js';
import { directions,keys } from "../constants.js";
import * as items from './item.js';  

export class Player extends humanoidEntity {

    constructor(x, y, size) {
        super(x, y, size);

        this.invulnerabilityTime = 0.5;

        this.inventory = {
            items: [],
            maxItems: 2,
            holding: 0
        };
        this.inventory.items = [new items.Pistol(this.size), new items.AutoRifle(this.size)];
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
            const heldItem = this.inventory.items[this.inventory.holding];

            if (heldItem == null) {
                return;
            }

            const gunPosition = heldItem.model.getLastPosition();
            this.inventory.items[this.inventory.holding].shoot(this.room, gunPosition.x, gunPosition.y, this.facing);
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

    clearShotBullets() {
        for (let i = 0; i < this.inventory.items.length; i++) {
            if (this.inventory.items[i] != null) {
                this.inventory.items[i].clearShotBullets();
            }
        }
    }

    updateBullets(p5) {
        let ret = [];

        for (let item of this.inventory.items) {
            if (item != null) {
                ret = ret.concat(item.updateBullets(p5));
            }
        }

        return ret;
    }

    removeBullets(bullets) {
        for (let item of this.inventory.items) {
            if (item == null) {
                continue;
            }
            
            for (let bullet of bullets) {
                item.removeBullet(bullet);
            }
        }
    }

    enemyCollision(enemies) {
        for (let enemy of enemies) {
            if (enemy.dead) {
                continue;
            }

            // Doesnt work right

            if (this.y < enemy.model.y + enemy.model.h && 
                this.y + this.size > enemy.model.y &&
                this.x - this.model.w/2 - enemy.model.w/2 < enemy.model.x + enemy.model.w/2 &&
                this.x - this.model.w/2 + enemy.model.w/2 > enemy.model.x - enemy.model.w/2
            ) {
                return enemy;
            }
        }

        return null;
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