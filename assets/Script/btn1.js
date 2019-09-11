
import {swipeImage} from './utils';

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            swipeImage(cc.find('Canvas/bg1'), 1, -100);
        }, this);
    },

    start() {
    },

    // update (dt) {},
});
