import { buttonEffect } from './utils';

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            buttonEffect(this.node);
        });
    },

    start() {
        // this.node.setPositionY(300);
    },

    // update (dt) {},
});
