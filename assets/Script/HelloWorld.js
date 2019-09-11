import { loadImage } from './utils';

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        // this.label.string = this.text;
    },

    // called every frame
    update: function (dt) {

    },

    start() {
        console.log('适配');
        let c = this.node.getComponent(cc.Canvas);
        c.fitHeight = true;
        c.fitWidth = false;
        let h = 960 * cc.winSize.height / cc.winSize.width;
        c.designResolution = new cc.Size(960, h);
        this.node.setContentSize(960, h);
        loadImage(cc.find('Canvas/bg1'));
    }
});
