import { getConfig } from './levelConfig.js';
import { Enviroment } from '../enviroment/enviroment.js';
import { createEnemy } from '../entities/enemy.js';
import { Bullet } from '../entities/bullet.js';

export class Level {
    constructor (p5, lvl, player) {
        this.lvl = lvl;
        this.config = getConfig(this.lvl, p5);
        
        player.setPosition(
            this.config.data.startingPosition.x,
            this.config.data.startingPosition.y,
            this.config.data.startingPosition.facing
        );

        player.setRoom(this.config.data.enviroment.size, this.config.data.enviroment.roomPos);

        this.enviroment = new Enviroment(
            p5, 
            this.config
        );

        this.enemys = [];

        for (let enemy of this.config.enemys) {
            const newEnemy = createEnemy(
                enemy.constructor,
                enemy.x,
                enemy.y,
                enemy.size
            );
            newEnemy.setRoom(this.config.data.enviroment.size, this.config.data.enviroment.roomPos);
            this.enemys.push(
                newEnemy
            );
        }

        this.doors = this.enviroment.getDoors();
        

        this.updateDoors = false;
    }

    enemysAndBulletStuff(p5, player) {
        let bullets = player.updateBullets(p5);
        let deadEnemys = [];
    
        for (let enemy of this.enemys) {
            let removeBullets = []
            enemy.update(player);
            for (let bullet of bullets) {
                const colision = enemy.checkBulletCollision(bullet);
    
                if (colision) {
                    removeBullets.push(bullet);
                    enemy.takeDamage(bullet.damage);
    
                    if (enemy.dead) {
                        deadEnemys.push(enemy);
                        break;
                    }
                }
            }

            player.removeBullets(removeBullets);
        }
    
        for (let enemy of deadEnemys) {
            this.enemys.splice(this.enemys.indexOf(enemy), 1);
        }
    }
    
    update(p5, player) {
        let doors = this.updateDoors ? this.doors : null;

        
        this.enviroment.update(p5, player, this.enemys, doors);

        this.enemysAndBulletStuff(p5, player);


        const colidingEnemy = player.enemyCollision(this.enemys);
        if (colidingEnemy != null) {
            player.takeDamage(colidingEnemy.damage);
        }

        if (this.enemys <= 0) {
            for (let door of this.doors) {
                if (door.goto != null) {
                    door.setOpen(true);
                }
            }
            this.updateDoors = true;
        } else{
            this.updateDoors = false;
        }

    }

    checkIfNextLevel(player) {
        let openDoors = this.doors.filter(door => door.getOpen());
        let next;

        if (next = player.checkDoorCollision(openDoors)) {
            return next;
        }

        return false;
    }
}