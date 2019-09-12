export const IMAGES_LENGTH = 4;

export function getUrl(idx = parseInt(Math.random() * IMAGES_LENGTH) + 1) {
    return cc.url.raw(`resources/${idx}.png`);
}

export function isIphoneX() {
    return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
}

export function isIphone() {
    return /iphone/gi.test(navigator.userAgent);
}

let moving = false;
export function swipeImage(node, to) {
    if (moving) {
        return;
    }
    moving = true;
    const { x, y } = node;
    node.runAction(cc.sequence(
        cc.moveTo(0.2, cc.p(to, y)),
        cc.moveTo(0.0, cc.p(0, y))
    ));
    loadImage(node, getUrl());
    moving = false;
}

export function loadImage(node, url = getUrl()) {
    cc.loader.load(url, function (err, texture) {
        var sp1 = node.getComponent(cc.Sprite);
        // var sFrame = new cc.SpriteFrame(texture, new cc.Rect(0, 0, 375, 812), false, cc.Vec2.ZERO, new cc.Size(812, 375));
        var sFrame = new cc.SpriteFrame(texture, new cc.Rect(0, 0, texture.width, texture.height), false, cc.Vec2.ZERO, new cc.Size(1080, 760));
        sp1.spriteFrame = sFrame;
    })
}


export function buttonEffect(node) {
    node.runAction(cc.sequence(
        cc.scaleTo(0.1, 0.7, 0.7),
        cc.scaleTo(0.1, 1, 1)
    ));
}


const TRAJECTORY_SPEED_RATIO = 12;
const TRAJECTORY_SPEED_IGNORE = 5;
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
        if (Math.abs(unit.x) < TRAJECTORY_SPEED_IGNORE && Math.abs(unit.y) < TRAJECTORY_SPEED_IGNORE) {
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