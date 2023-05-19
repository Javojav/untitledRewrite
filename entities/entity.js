import { directions } from "../constants.js";

export class Entity {
    constructor(x, y , size, entityModelConstrucotr) {
        this.x = x;
        this.y = y;
        this.size = size;
        
        this.speed = 5;

        this.entityModelConstrucotr = null;
        
        this.model = null;

        this.room = {
            roomSize: {
                w: -1,
                h: -1
            },
            roomPos: {
                x: -1,
                y: -1
            }
        }
    }

    setRoom(roomSize, roomPos) {
        this.room.roomSize = roomSize;
        this.room.roomPos = roomPos;
    }

    setPosition(x, y, facing) {
        this.x = x;
        this.y = y;
        this.facing = facing;
    }

    checkWallCollision() {
        return false;
    }

    move (direction) {
        let previousPosition = {
            x: this.x,
            y: this.y
        };

        switch (direction) {
            case directions.up:
                this.y -= this.speed;
                break;
            case directions.down:
                this.y += this.speed;
                break;
            case directions.left:
                this.x -= this.speed;
                break;
            case directions.right:
                this.x += this.speed;
                break;
        }

        if (this.checkWallCollision()) {
            this.x = previousPosition.x;
            this.y = previousPosition.y;
        }
    }
}