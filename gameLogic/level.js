import { getConfig } from './levelConfig.js';
import { Enviroment } from '../enviroment/enviroment.js';

export class Level {
    constructor (p5, number) {
        this.number = number;
        this.config = getConfig(number, p5);
        
        this.enviroment = new Enviroment(
            p5, 
            this.config
        );
    }
    
    display(p5) {
        this.enviroment.display(p5);
    }
}