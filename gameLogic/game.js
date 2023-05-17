import { Level } from './level.js';

export class Game {
    constructor(p5) {
        // Caxo d Singleton
        if (Game.instance) {
            return Game.instance;
        }

        Game.instance = this;

        this.levelNumerito = 0;
        this.level = new Level(p5, this.levelNumerito);
    }

    update(p5) {
        this.level.display(p5);
    }
}