export class GameDataDisplay {
    constructor() {
        this.levelElement = document.getElementById("levelDisplay");
        this.healthElement = document.getElementById("healthDisplay");
        this.currentAmmo1 = document.getElementById("currentAmmoDisplay1");
        this.inventoryAmmo1 = document.getElementById("inventoryAmmoDisplay1");
        this.currentAmmo2 = document.getElementById("currentAmmoDisplay2");
        this.inventoryAmmo2 = document.getElementById("inventoryAmmoDisplay2");

    }

    update(level, player) {
        this.levelElement.innerHTML = level;
        
        this.healthElement.innerHTML = player.health;

        if (player.inventory.items[0]) {
            this.currentAmmo1.innerHTML = player.inventory.items[0].currentAmmo;
            this.inventoryAmmo1.innerHTML = player.inventory.items[0].inventoryAmmo;
        } else {
            this.currentAmmo1.innerHTML = "XXX";
            this.inventoryAmmo1.innerHTML = "XXX";
        }

        if (player.inventory.items[1]) {
            this.currentAmmo2.innerHTML = player.inventory.items[1].currentAmmo;
            this.inventoryAmmo2.innerHTML = player.inventory.items[1].inventoryAmmo;
        } else {
            this.currentAmmo2.innerHTML = "XXX";
            this.inventoryAmmo2.innerHTML = "XXX";
        }

    }
}