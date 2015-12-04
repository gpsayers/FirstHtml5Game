var battleMain = function () {};



battleMain.prototype = {
    preload: function () {

    },

    create: function () {

		
		this.initBattleScene();
		
		this.initBattleMenu();
    },

    update: function () {
        if (game.input.activePointer.isDown)
            {
                gameVariables.player.hitpoints--;
                gameVariables.player.positionY = gameVariables.player.positionY + 20
                game.state.start('gameMain');
            }
    },

	
	initBattleScene: function () {
		battleEnemies.forEach(function(item){
            var enemy = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'rpg' ,item);
        })
		
		var wiz = game.add.sprite(100,100,'rpg', '');
		
		
	},
	
	initBattleMenu: function () {
		var txt = game.add.text(50,game.camera.height-20, 'Attack', {});
		
		txt.event.onInputUp.add(attack, this);
	},
	
	attack: function() {
		
	},
}
