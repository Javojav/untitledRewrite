import { getConfig } from './levelConfig.js';
import { Enviroment } from '../enviroment/enviroment.js';

export class Level {
    constructor (p5, lvl, player) {
        this.lvl = lvl;
        this.config = getConfig(this.lvl, p5);
        
        player.setPosition(
            this.config.data.startingPosition.x,
            this.config.data.startingPosition.y,
            this.config.data.startingPosition.facing
        );

        player.setRoom(this.config.data.enviroment.size, this.config.data.enviroment.roomPos);

        this.enviroment = new Enviroment(
            p5, 
            this.config
        );

        this.doors = this.enviroment.getDoors();
        

        this.updateDoors = false;
    }
    
    update(p5, player) {
        let doors = this.updateDoors ? this.doors : null;

        this.enviroment.update(p5, player, doors);
    
        this.updateDoors = false;
    }

    checkIfNextLevel(player) {
        let openDoors = this.doors.filter(door => door.getOpen());
        let next;

        if (next = player.checkDoorCollision(openDoors)) {
            return next;
        }

        return false;
    }
}