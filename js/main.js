/**
 * Created by Garth on 12/1/2015.
 */
var gameProperties = {
    screenWidth: 640,
    screenHeight: 470
};

var gameVariables = {
    player: {
        hitpoints: 100,
        experience: 0,
        gold: 0

    },

};

var hudText = {
    health: "",
    experience: ""
}

var mainState = function (game) {};

mainState.prototype = {
    preload: function () {
        game.load.script('mainMenu', 'js/mainMenu.js');
        game.load.script('mainGame', 'js/game.js');
    },
    create: function () {
        game.state.add('mainMenu', mainMenu);
        game.state.add('gameMain', gameMain);
        game.state.start('mainMenu');
    },
    update: function () {

    }
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);

game.state.start('main');
