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
        this.previousLevel = {
            level: null,
            playerRoom: null,
        }

        this.player = new Player(0, 0, 75);

        this.startLevel(p5)

        this.gameDataDisplay = new GameDataDisplay();

    }
    
    startLevel(p5) {
        this.savePreviousLevel();
        this.level = new Level(p5, this.loadLevel, this.player);
    }

    savePreviousLevel() {
        // maybe put this in a stack at some point
        this.previousLevel.playerRoom = {...this.player.room};
        this.previousLevel.level = this.level;
    }

    returnLevel() {
        this.player.room = this.previousLevel.playerRoom;
        this.level = this.previousLevel.level;
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
                this.returnLevel();
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