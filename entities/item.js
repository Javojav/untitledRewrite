import * as itemModels from '../enviroment/item.js'

export class Gun {
    constructor() {
        this.magCapacity = 8;
        this.maxAmmo = this.magCapacity * 3;
        this.model = itemModels.Pistol;

        this.currentAmmo = this.magCapacity;
        this.inventoryAmmo = this.maxAmmo;
    }

    reload() {
        if (this.inventoryAmmo > 0) {
            let reloadingAmmo = this.magCapacity - this.currentAmmo; 
            reloadingAmmo = Math.min(reloadingAmmo, this.inventoryAmmo);
            this.inventoryAmmo -= reloadingAmmo;
            this.currentAmmo += reloadingAmmo;
        }
    }

    shoot() {
        if (this.currentAmmo > 0) {
            this.currentAmmo--;
        }
    }
}

export class Pistol extends Gun {
    constructor(modelSize) {
        super();

        this.modelSize = modelSize;
        this.magCapacity = 8;

        this.model = new itemModels.Pistol(this.modelSize);

    }
}