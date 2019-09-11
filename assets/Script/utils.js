export const IMAGES_LENGTH = 12;

export function getUrl(idx = parseInt(Math.random() * IMAGES_LENGTH) + 1) {
    return cc.url.raw(`resources/${idx}.jpg`);
}

let moving = false;
export function swipeImage(node, time, degree, url = getUrl()) {
    if (moving) {
        return;
    }
    moving = true;
    var rotationTo = cc.rotateTo(time, 0, degree);
    node.runAction(rotationTo);
    setTimeout(() => {
        rotationTo = cc.rotateTo(0, 0, 0);
        node.runAction(rotationTo);
        loadImage(node, url);
        moving = false;
    }, time * 1000);
}

export function loadImage(node, url = getUrl()) {
    cc.loader.load(url, function (err, texture) {
        var sp1 = node.getComponent(cc.Sprite);
        var sFrame = new cc.SpriteFrame(texture, new cc.Rect(0, 0, texture.width, texture.height), false, cc.Vec2.ZERO, new cc.Size(1080, 760));
        sp1.spriteFrame = sFrame;
    })
}


const TRAJECTORY_SPEED_RATIO = 12;
export class trajectory {
    constructor(len = 10) {
        if (len !== undefined && !Number.isInteger(len)) {
            throw TypeError('It has to be an interger');
        }
        this.reset();
        this.len = len;
    }
    reset() {
        this.x = true;
        this.y = true;
        this.list = [];
    }

    _peek() {
        return this.list[this.list.length - 1];
    }

    push(unit) {
        if (Math.abs(unit.x) < 1 && Math.abs(unit.y) < 1) {
            return;
        }
        if (this.list.length == 0) {
            this.list.push(unit);
            this.x = unit.x >= 0;
            this.y = unit.y >= 0;
        } else {
            const x = unit.x >= 0;
            const y = unit.y >= 0;
            if (x == this.x && y == this.y) {
                this.list.push(unit);
                console.log('push:', unit);
                if (this.list.length > this.len) {
                    this.list.shift();
                }
            } else {
                this.list = [unit];
                this.x = unit.x >= 0;
                this.y = unit.y >= 0;
            }
        }
    }

    getSpeed() {
        const l = this.list.length;
        const speedX = this.list.reduce((a, b) => a + b.x, 0) * TRAJECTORY_SPEED_RATIO / l;
        const speedY = this.list.reduce((a, b) => a + b.y, 0) * TRAJECTORY_SPEED_RATIO / l;
        console.log('speed:', speedX, speedY);
        return { speedX, speedY };
    }

}