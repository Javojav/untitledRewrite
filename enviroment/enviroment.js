import { createWall} from './wall.js';
import { createFloor } from './floor.js';
import { createDoor } from './door.js'; 

export class Enviroment {
    constructor (p5, config) {
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

        this.doors = [];

        for (let door of config.data.enviroment.doors) {
            this.doors.push(
                createDoor(door.constructor, door, this.enviroment.roomPos, this.enviroment.size)
            );
        }
    }
    
    display(p5) {
        this.wall.display(p5);
        this.floor.display(p5);

        for (let door of this.doors) {
            door.display(p5);
        }
    }
}