var gameMain = function () {};

var gameVariables = {
    gamePlay: {
        playerMovement: 100,
        tweenSpeed: 500,
        playerMoving: false,
    },
    player: {},

    Mobs: {},

};

var Mobs;

var hudText = {
    health: {},
    experience: {},
    gold: {}
};

var battleEnemies = [];

var playerMoveCount = 0;

gameMain.prototype = {

    preload: function () {
        game.load.atlasJSONHash('rpg', 'assets/SpriteSheet.png', 'assets/SpriteJSON.json');

        game.load.tilemap('level', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('gameTiles', 'assets/grass-tiles-2-small.png');

        game.load.json('mobs', 'assets/json/mobs.json');

        game.load.json('player', 'assets/json/player.json');


    },

    create: function () {

        loadSavedFiles();

        map = game.add.tilemap('level');

        map.addTilesetImage('grass-tiles-2-small', 'gameTiles');

        backgroundlayer = map.createLayer('Background');

        backgroundlayer.resizeWorld();

        //game.physics.startSystem(Phaser.Physics.ARCADE);

        this.initMobs();

        this.initPlayer();

        this.initializeHud();

    },

    update: function () {


        this.movePlayer();

        this.updateHud();

        //game.physics.arcade.overlap(wiz, orc, this.collideDoStuff, null, this);
        gameVariables.Mobs.Mob.forEach(function (item) {
            if (checkOverlap(gameVariables.player.SpriteObj, item.SpriteObj)) {

                collide(gameVariables.Mobs.Mob.indexOf(item));
            }

        });

    },

    initPlayer: function () {


        gameVariables.player.SpriteObj = game.add.sprite(gameVariables.player.positionX, gameVariables.player.positionY, gameVariables.player.Spritesheet, gameVariables.player.FileName);

        gameVariables.player.SpriteObj.anchor.setTo(0.5, 0.5);

        game.camera.follow(gameVariables.player.SpriteObj);

        //wiz = gameVariables.player.SpriteObj;
        //                  wiz = game.add.sprite(gameVariables.player.positionX, gameVariables.player.positionY, 'rpg', 'Magier_0.png');
        //
        //        wiz.anchor.setTo(0.5, 0.5);
        //
        //        game.camera.follow(wiz);
        //
        //        //game.physics.enable([wiz, orc], Phaser.Physics.ARCADE);
        //
        //game.physics.enable(gameVariables.player.SpriteObj, Phaser.Physics.ARCADE);

    },

    initMobs: function (group) {

        //orc = game.add.sprite(50, 50, 'rpg', 'orc_1.png');

        //orc.anchor.setTo(0.5, 0.5);

        gameVariables.Mobs.Mob.forEach(function (item) {

            if (item.Visible) {

                item.SpriteObj = game.add.sprite(item.StartingX, item.StartingY, item.Spritesheet, item.FileName);

                item.SpriteObj.anchor.setTo(0.5, 0.5);

            }

        });

    },

    initializeHud: function () {
        hudText.health = game.add.text(gameProperties.screenWidth - 200, 20, "Health: " + gameVariables.player.hitpoints);

        hudText.health.fixedToCamera = true;
    },

    updateHud: function () {
        hudText.health.setText("Health: " + gameVariables.player.hitpoints);
    },

    movePlayer: function () {

        if (game.input.activePointer.isUp) {
            playerMoveCount = 0;
        }

        if (game.input.activePointer.isDown) {

            playerMoveCount++;

            if (playerMoveCount < 2 && gameVariables.gamePlay.playerMoving == false) {

                var newX = this.game.input.worldX;
                var newY = this.game.input.worldY;

                if (newX > gameVariables.player.positionX) {
                    if (newX - gameVariables.player.positionX > Math.abs(newY - gameVariables.player.positionY)) {
                        //Move RIGHT
                        movePlayerDir('right');
                    } else {
                        if (newY > gameVariables.player.positionY) {
                            //Move DOWN
                            movePlayerDir('down');

                        } else {
                            //Move UP
                            movePlayerDir('up');
                        }
                    }
                } else {
                    if (gameVariables.player.positionX - newX > Math.abs(newY - gameVariables.player.positionY)) {
                        //MOVE LEFT
                        movePlayerDir('left');
                    } else {
                        if (newY > gameVariables.player.positionY) {
                            //MOVE DOWN
                            movePlayerDir('down');
                        } else {
                            //MOVE UP
                            movePlayerDir('up');
                        }
                    }
                }

            }

        }

    },


};

function collide(id) {

    game.state.start('battleMain', true, false, gameVariables.Mobs.Mob[id]);
}

function movePlayerDir(direction) {
    gameVariables.gamePlay.playerMoving = true;
    console.log(gameVariables.player.positionX);
    console.log(gameVariables.player.positionY);

    var tween;

    if (direction == 'up') {
        tween = game.add.tween(gameVariables.player.SpriteObj).to({
            y: gameVariables.player.SpriteObj.y - gameVariables.gamePlay.playerMovement
        }, gameVariables.gamePlay.tweenSpeed, Phaser.Easing.Linear.None, true);
    } else if (direction == 'left') {
        tween = game.add.tween(gameVariables.player.SpriteObj).to({
            x: gameVariables.player.SpriteObj.x - gameVariables.gamePlay.playerMovement
        }, gameVariables.gamePlay.tweenSpeed, Phaser.Easing.Linear.None, true);
    } else if (direction == 'right') {
        tween = game.add.tween(gameVariables.player.SpriteObj).to({
            x: gameVariables.player.SpriteObj.x + gameVariables.gamePlay.playerMovement
        }, gameVariables.gamePlay.tweenSpeed, Phaser.Easing.Linear.None, true);
    } else if (direction == 'down') {
        tween = game.add.tween(gameVariables.player.SpriteObj).to({
            y: gameVariables.player.SpriteObj.y + gameVariables.gamePlay.playerMovement
        }, gameVariables.gamePlay.tweenSpeed, Phaser.Easing.Linear.None, true);
    } else {
        console.log('Player move unknown direction');
    }

    gameVariables.player.positionX = gameVariables.player.SpriteObj.x;
    gameVariables.player.positionY = gameVariables.player.SpriteObj.y;

    gameVariables.gamePlay.playerMoving = false;

}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
