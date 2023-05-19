export class GameDataDisplay {
    constructor() {
        this.levelElement = document.getElementById("levelDisplay");
    }

    update(level) {
        this.levelElement.innerHTML = level;
    }
}