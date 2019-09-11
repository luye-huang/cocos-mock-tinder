import { trajectory, loadImage, getUrl, IMAGES_LENGTH } from './utils';
const LIMIT = 1600;
cc.Class({
    extends: cc.Component,

    properties: {
        bg: null,
        url: '',
        initialX: 0,
        initialY: 0,
        trajectory: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initialX = this.node.x;
        this.initialY = this.node.y;
        this.bg = cc.find('Canvas/bg2');
        this.bg.active = false;
        this.node.zIndex = 100;
        this.trajectory = new trajectory(10);
        this.node.children.forEach(c => c.active = false);
    },

    start() {
        let mouseDown = false;
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.idx = parseInt(Math.random() * IMAGES_LENGTH) + 1;
            this.url = getUrl(this.idx);
            this.bg.active = true;
            loadImage(this.bg, this.url);
            mouseDown = true;
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            if (!mouseDown) return;
            let delta = event.getDelta();
            console.log(delta);
            this.trajectory.push(delta);
            this.node.x = this.node.x + delta.x;
            this.node.y = this.node.y + delta.y;
            if (delta.x < 0) {
                this.node.children[0].active = false;
                this.node.children[1].active = true;
            } else {
                this.node.children[1].active = false;
                this.node.children[0].active = true;
            }
        });

        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            mouseDown = false;
            this.disposeImg();
        });

    },

    disposeImg() {
        const { speedX, speedY } = this.trajectory.getSpeed();
        this.trajectory.reset();
        let timer = setInterval(() => {
            if (Math.abs(this.node.x) < LIMIT && Math.abs(this.node.y) < LIMIT) {
                this.node.x += speedX;
                this.node.y += speedY;
            } else {
                clearInterval(timer);
                this.reInit();
            }
        }, 20);
    },

    reInit() {
        this.node.zIndex = -100;
        this.node.children.forEach(c => c.active = false);
        loadImage(this.node, this.url);
        this.node.x = this.initialX;
        this.node.y = this.initialY;
        this.bg.active = false;
        this.node.zIndex = 100;
    }

    // update (dt) {},
});
