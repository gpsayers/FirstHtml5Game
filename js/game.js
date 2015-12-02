/**
 * Created by Garth on 12/1/2015.
 */
var gameProperties = {
    screenWidth: 640,
    screenHeight: 470
};

var mainState = function (game) {

};

mainState.prototype = {
    preload: function() {

    },
    create: function() {

    },
    update: function () {

    }
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight,Phaser.AUTO,'gameDiv');

game.state.add('main',mainState);

game.state.start('main');