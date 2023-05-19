import { directions } from "../constants.js";

const defaultSizes = {
    horizontal : {
        open: {
            w: 200,
            h: 125
        },
        closed: {
            w: 200,
            h: 7
        },
    }, 
    vertical: {
        open: {
            w: 125,
            h: 200
        },
        closed: {
            w: 7,
            h: 200
        },
    }
}

export const defaultPositions = {
    top: {
        direction: directions.up,
        open: defaultSizes.horizontal.open,
        closed: defaultSizes.horizontal.closed,
        x: 0,
        y: 0,
        centerX: true,
        centerY: false,
        defaultOpen: false
    }, 
    bottom: {
        direction: directions.down,
        open: defaultSizes.horizontal.open,
        closed: defaultSizes.horizontal.closed,
        centerX: true,
        centerY: false,
        x: 0,
        y: -0.1,
        defaultOpen: false
    },
    left: {
        direction: directions.left,
        open: defaultSizes.vertical.open,
        closed: defaultSizes.vertical.closed,
        centerX: false,
        centerY: true,
        x: 0,
        y: 0,
        defaultOpen: false
    },
    right: {
        direction: directions.right,
        open: defaultSizes.vertical.open,
        closed: defaultSizes.vertical.closed,
        centerX: false,
        centerY: true,
        x: -0.1,
        y: 0,
        defaultOpen: false
    }
}

export class DoorLogic {
    // door logic
    constructor (dataDoor, roomPos, roomSize) {
        this.roomSize = roomSize;
        this.roomPos = roomPos;
        this.dataDoor = dataDoor;

        this.goto = dataDoor.goto;

        this.open = dataDoor.defaultOpen === undefined ? dataDoor.position.defaultOpen : dataDoor.defaultOpen;
    
        this.position = {...dataDoor.position};

        [
            this.currentX, 
            this.currentY,
            this.currentW,
            this.currentH,
        ] = this.calculatePosition();


    }

    calculatePosition() {
        let x, y, w, h;

        // I know this shit is ugly
        if (this.position.x < 0){
            this.position.x =  this.roomSize.w + this.position.x;
            this.negativeX = true;
        }

        if (this.position.y < 0){
            this.position.y =  this.roomSize.h + this.position.y;
            this.negativeY = true;
        }

        this.x = this.position.centerX 
        ? this.roomPos.x + (this.roomSize.w / 2)
        : this.roomPos.x + this.position.x;

        this.y = this.position.centerY
        ? this.roomPos.y + (this.roomSize.h / 2)
        : this.roomPos.y + this.position.y;

        if (this.open) {
            x = this.position.centerX ? this.x - (this.position.open.w/ 2)  : this.x;
            y = this.position.centerY ? this.y - (this.position.open.h/ 2)  : this.y;
            
            if (this.negativeX) {
                x = x - this.position.open.w;
            }
            
            if (this.negativeY) {
                y = y - this.position.open.h;
            }

            w = this.position.open.w;
            h = this.position.open.h;
            
        
        } else {
            x = this.position.centerX ? this.x - (this.position.closed.w / 2) : this.x;
            y = this.position.centerY ? this.y - (this.position.closed.h / 2) : this.y;

            if (this.negativeX) {
                x = x - this.position.closed.w;
            }

            if (this.negativeY) {
                y = y - this.position.closed.h;
            }

            w = this.position.closed.w;
            h = this.position.closed.h;
        }


        return [x, y, w, h];
    }

    getPosition() {
        return [this.currentX, this.currentY, this.currentW, this.currentH];
    }

    open() {
        this.open = true;
    }

    close() {
        this.open = false;
    }

    toggle() {
        this.open = !this.open;
    }

    setOpen(open) {
        this.open = open;
        [
            this.currentX, 
            this.currentY,
            this.currentW,
            this.currentH,
        ] = this.calculatePosition();
    }

    getOpen() {
        return this.open;
    }
}