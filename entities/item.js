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

    removeBullet(bullet) {
        const index = this.shotBullets.indexOf(bullet);

        if (index == -1) {
            return;
        }

        this.shotBullets.splice(index, 1);
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
            this.removeBullet(bullet);
        }

        return this.shotBullets;
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
        else {
            if (this.currentAmmo <= 0) {
                this.reload();
            }
        }
    }
}

export class AutoRifle extends Gun {
    constructor(modelSize) {
        super();
        this.modelSize = modelSize;
        
        this.magCapacity = 31;

        this.maxAmmo = this.magCapacity * 3;

        this.currentAmmo = this.magCapacity;
        this.inventoryAmmo = this.maxAmmo;

        this.bulletSpeed = 15;
        this.bulletSize = 10;
        this.bulletDamage = 1;
        this.reloadTime = 1.5;
        this.shootCooldown = .2;

        this.model = new itemModels.AutoRifle(this.modelSize);
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