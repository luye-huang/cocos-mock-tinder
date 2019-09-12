
import { swipeImage, buttonEffect } from './utils';

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            buttonEffect(this.node);
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            // cc.find('Canvas/bg2').active = false;
            swipeImage(cc.find('Canvas/bg1'), -500);
        }, this);
    },

    start() {
        // this.node.setPositionY(300);
    },

    // update (dt) {},
});
