/**
 * Created by Garth on 12/1/2015.
 */
var gameProperties = {
    screenWidth: 640,
    screenHeight: 470
};



var mainState = function (game) {};

mainState.prototype = {
    preload: function () {
        game.load.script('mainMenu', 'js/mainMenu.js');
        game.load.script('mainGame', 'js/game.js');
        game.load.script('battleMain', 'js/battle.js');
        game.load.script('credits', 'js/Scenes/credits.js');
        game.load.script('helper', 'js/helper.js');
        game.load.script('create', 'js/Scenes/createCharacter.js');
    },
    create: function () {
        game.state.add('mainMenu', mainMenu);
        game.state.add('gameMain', gameMain);
        game.state.add('battleMain', battleMain);
        game.state.add('credits', credits);
        game.state.add('create', createChar);
        game.state.start('mainMenu');

    },
    update: function () {

    }
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);

game.state.start('main');


