import { loadImage, isIphone } from './utils';
// import '../resources/style0.css';
{/* <link rel="stylesheet" type="text/css" href="style0.css"/>
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link> */}


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
        console.log('适配', navigator.userAgent);
        let c = this.node.getComponent(cc.Canvas);
        cc.director.setClearColor(cc.color(238, 232, 170));
        this.node.setContentSize(960, 700);
        // loadImage(cc.find('Canvas/bg1'));
        if (!isIphone()) {
            cc.find('Canvas/header').active = false;
        }
    },
});
