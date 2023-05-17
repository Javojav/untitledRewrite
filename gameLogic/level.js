import { getConfig } from './levelConfig.js';
import { Enviroment } from '../enviroment/enviroment.js';

export class Level {
    constructor (p5, number) {
        this.number = number;
        this.config = getConfig(number, p5);
        
        this.enviroment = new Enviroment(
            p5, 
            this.config.data.enviroment.wallConstructor,
            this.config.data.enviroment.floorConstructor,
            this.config.data.enviroment.size,
            this.config.data.enviroment.roomPos
        );
    }
    
    display(p5) {
        this.enviroment.display(p5);
    }
}