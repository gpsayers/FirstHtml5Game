var battleMain = function () {};



battleMain.prototype = {
    preload: function () {

    },

    create: function () {
        battleEnemies.forEach(function(item){
            var enemy = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'rpg' ,item);
        })
    },

    update: function () {
        if (game.input.activePointer.isDown)
            {
                gameVariables.player.hitpoints--;
                gameVariables.player.positionY = gameVariables.player.positionY + 20
                game.state.start('gameMain');
            }
    },

}
