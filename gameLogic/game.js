import { Level } from './level.js';
import { Player } from '../entities/player.js';
import { GameDataDisplay } from '../gameDataDisplay.js';

export class Game {
    constructor(p5) {
        // Caxo d Singleton
        if (Game.instance) {
            return Game.instance;
        }

        Game.instance = this;

        this.levelNumerito = 0;
        this.loadLevel = "entrada";
        this.level = null;
        this.previousLevel = null;

        this.player = new Player(0, 0, 75);

        this.startLevel(p5)

        this.gameDataDisplay = new GameDataDisplay();

    }
    
    startLevel(p5) {
        this.previousLevel = this.level;
        this.level = new Level(p5, this.loadLevel, this.player);
    }

    update(p5) {
        this.player.handleInput(p5);
        this.level.update(p5, this.player);

        let nextLevel = this.level.checkIfNextLevel(this.player);

        if (nextLevel !== false) {
            if (nextLevel == "nextLevel") {
                this.levelNumerito++;
                this.loadLevel = this.levelNumerito;
            } else if (nextLevel == "return") {
                this.level = this.previousLevel;
                return;
            }
            else {
                this.loadLevel = nextLevel;
            }
            this.startLevel(p5);
        }
        this.gameDataDisplay.update(this.level.lvl);

    }
}