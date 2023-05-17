import { createWall} from './wall.js';
import { createFloor } from './floor.js';

export class Enviroment {
    constructor (p5, wallConstructor, floorConstructor, size, roomPos) {
        this.size = size;
        this.roomPos = roomPos;
        this.wall = createWall(
            wallConstructor,
            roomPos.y,
            p5.height - size.h - roomPos.y,
            roomPos.x,
            p5.width - size.w - roomPos.x
        );
        
        this.floor = createFloor(floorConstructor, roomPos.x, roomPos.y, size.w, size.h);
    }
    
    display(p5) {
        this.wall.display(p5);
        this.floor.display(p5);
    }
}