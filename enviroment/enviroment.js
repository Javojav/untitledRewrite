import { createWall} from './wall.js';
import { createFloor } from './floor.js';
import { createDoor } from './door.js'; 
import { createHumanoid } from './humanoid.js';

export class Enviroment {
    constructor (p5, config) {
        this.config = config;
        this.enviroment = config.data.enviroment;
        this.size = this.enviroment.size;
        this.roomPos = this.enviroment.roomPos;

        this.wall = createWall(
            this.enviroment.wallConstructor,
            this.roomPos.y,
            p5.height - this.size.h - this.roomPos.y,
            this.roomPos.x,
            p5.width - this.size.w - this.roomPos.x
        );
        
        this.floor = createFloor(
            this.enviroment.floorConstructor, 
            this.roomPos.x, 
            this.roomPos.y, 
            this.size.w, 
            this.size.h
        );

        this.player = createHumanoid(
            this.config.playerModelConstructor,
            this.config.data.startingPosition.x,
            this.config.data.startingPosition.y,
            0
        );

        this.doors = [];

        for (let door of config.data.enviroment.doors) {
            this.doors.push(
                createDoor(door.constructor, door, this.enviroment.roomPos, this.enviroment.size)
            );
        }

        this.enemys = [];
    }

    getDoors() {
        return [...this.doors];
    }
    
    update(p5, player, enemys, doors = null, updateLegsPlayer = false) {
        this.player.setPosition(player.x, player.y, player.facing);
        this.player.setHeight(player.size);

        if (updateLegsPlayer)
            this.player.updateLegs();

        this.player.alpha = player.invulnerable ? 100 : 255;

        this.enemys = enemys;
        
        for (let enemy of this.enemys) {
            enemy.model.setHealthBarParameters(enemy.health, enemy.maxHealth)
            enemy.model.setPosition(enemy.x, enemy.y, enemy.facing);
            enemy.model.updateLegs();
        }
        
        const holdingIndex = player.inventory.holding;
        const holding = player.inventory.items[holdingIndex];
        
        this.player.setItem(holding ? holding.model : null);

        if (doors) {
            this.doors = doors;
        }
            
        this.display(p5);
    }

    display(p5) {
        this.wall.display(p5);
        this.floor.display(p5);

        for (let door of this.doors) {
            door.display(p5);
        }

        this.player.display(p5);

        for (let enemy of this.enemys) {
            enemy.model.display(p5);
        }
    }
}