import * as itemModels from '../enviroment/item.js'
import * as bullet from './bullet.js'

export class Gun {
    constructor() {
        this.magCapacity = 8;
        this.maxAmmo = this.magCapacity * 3;
        this.model = itemModels.Pistol;

        this.currentAmmo = this.magCapacity;
        this.inventoryAmmo = this.maxAmmo;

        this.bulletSpeed = 10;
        this.bulletSize = 10;
        this.bulletDamage = 1;
        this.reloadTime = 1;
        this.shootCooldown = .5;
        this.coolDownOver = true;
        this.reloadTimeOut = null;

        this.shotBullets = [];
    }

    reload() {
        if (this.inventoryAmmo > 0 && this.reloadTimeOut == null && this.currentAmmo < this.magCapacity) {
            this.reloadTimeOut = setTimeout(() => {
                let reloadingAmmo = this.magCapacity - this.currentAmmo; 
                reloadingAmmo = Math.min(reloadingAmmo, this.inventoryAmmo);
                this.inventoryAmmo -= reloadingAmmo;
                this.currentAmmo += reloadingAmmo;

                this.reloadTimeOut = null;
            }, this.reloadTime * 1000);
        }
    }

    canShoot() {
        return this.currentAmmo > 0 && this.coolDownOver;
    }

    clearShotBullets() {
        this.shotBullets = [];
    }

    updateBullets(p5) {
        let bulletsToRemove = [];

        for (let bullet of this.shotBullets) {
            let remove = bullet.move();
            bullet.display(p5);
            if (remove) {
                bulletsToRemove.push(bullet);
            }
        }
        
        for (let bullet of bulletsToRemove) {
          const index = this.shotBullets.indexOf(bullet);
          this.shotBullets.splice(index, 1);
        }
    }

    setCooldown() {
        this.coolDownOver = false;

        setTimeout(() => {
            this.coolDownOver = true;
        }, this.shootCooldown * 1000); 
    }


    shoot(room, x, y, direction) {
        if (this.canShoot()) {
            this.currentAmmo--;
            this.shotBullets.push(new bullet.Bullet(x, y, direction, this.bulletSpeed, this.bulletSize, this.bulletDamage, room));
            
            this.setCooldown();
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