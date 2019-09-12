import { trajectory, loadImage, getUrl } from './utils';
const LIMIT = 1600;
const HORIZONAL_IGNORE_SPEED = 50;
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
        // this.node.active = false;


        // this.node.setColor(cc.color(238, 232, 170));
        this.initialX = this.node.x;
        this.initialY = this.node.y;
        this.bg = cc.find('Canvas/bg2');
        this.bg.active = false;
        this.node.zIndex = 100;
        this.trajectory = new trajectory(10);
        this.node.children.forEach(c => c.active = false);
    },

    start() {

        // cc.find('Canvas/bg1').height = 812;
        // cc.find('Canvas/bg1').width = 375;
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.url = getUrl();
            this.bg.active = true;
            loadImage(this.bg, this.url);
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            let delta = event.getDelta();
            console.log(delta);
            this.trajectory.push(delta);
            this.node.x = this.node.x + delta.x;
            this.node.y = this.node.y + delta.y;
            this.handleIcon();
        });

        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            const speedX = this.trajectory.getSpeed().speedX;
            this.node.children.forEach(c => c.active = false);
            if (speedX > HORIZONAL_IGNORE_SPEED && this.node.x > this.initialX || speedX < -HORIZONAL_IGNORE_SPEED && this.node.x < this.initialX) {
                this.disposeImg();
            } else {
                this.resetImg();
            }
        });

    },

    handleIcon() {
        const [icon1, icon2] = this.node.children;
        if (this.node.x < this.initialX) {
            icon2.active = true;
            icon1.active = false;
            const ratio = (this.initialX - this.node.x) / 500;
            const opacity = ratio * 150 + 100;
            icon2.opacity = opacity;
            icon2.setScale(0.5 + ratio);
        }
        if (this.node.x > this.initialX) {
            icon1.active = true;
            icon2.active = false;
            const ratio = (this.node.x - this.initialX) / 500;
            const opacity = ratio * 150 + 100;
            icon1.opacity = opacity;
            icon1.setScale(0.5 + ratio);
        }
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

    resetImg() {
        // 按钮点击态 done
        // 适配 iphone X
        // 喜欢 不喜欢 渐变  done
        // 飞出替代旋转 done
        // header footer
        // 启动界面去掉  done
        // 图片换真人  done
        const speedX = (this.initialX - this.node.x) / 50;
        const speedY = (this.initialY - this.node.y) / 50;
        let count = 0;
        let timer = setInterval(() => {
            if (count < 50) {
                this.node.x += speedX;
                this.node.y += speedY;
                count++;
            } else {
                this.node.x = this.initialX;
                this.node.y = this.initialY;
                clearInterval(timer);
            }
        }, 3);
    },

    reInit() {
        this.node.zIndex = -100;
        loadImage(this.node, this.url);
        this.node.x = this.initialX;
        this.node.y = this.initialY;
        this.bg.active = false;
        this.node.zIndex = 100;
    },

    update(dt) {
        // console.log(55);
    },
});
