var gameMain = function () {};

var playerSprite;

var Mobs = [];

var hudText = {
    health: {},
    experience: {},
    gold: {},
    optionIcon: {},
    healthIcon: {},
    goldIcon: {},
    spellsIcon: {}
};

var battleMobs = [];

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

        if (this.delayTimer < game.time.now) {
            gameVariables.gamePlay.playerCollide = true;

        }

        if (gameVariables.gamePlay.playerCollide == false) {
            if (game.time.now % 8 > 1 ) {
                playerSprite.tint = 0xFFFFFF;
            } else {
                playerSprite.tint = 0xff0000;
            }
        }
                else {
            playerSprite.tint = 0xFFFFFF
        }



        this.movePlayer();

        this.updateHud();


        Mobs.forEach(function (item) {

            if (checkOverlap(playerSprite, item)) {

                //collisionFound = true;

                gameVariables.Mobs.Mob.forEach(function (gvItem) {

                    if (Mobs.indexOf(item) == gvItem.SpriteObj) {

                        //Check if mob is set to collide
                        if (gameVariables.gamePlay.playerCollide && gameVariables.gamePlay.playerMoving == false) {

                            collide(gvItem);

                        }
                    }

                });

            }


        });


    },

    initPlayer: function () {


        playerSprite = game.add.sprite(gameVariables.player.positionX, gameVariables.player.positionY, gameVariables.player.Spritesheet, gameVariables.player.FileName);


        playerSprite.anchor.setTo(0.5, 0.5);

        game.camera.follow(playerSprite);

        playerSprite.width = 75;
        playerSprite.height = 75;

        this.delayTimer = game.time.now + 2000;


    },

    initMobs: function (group) {

        var i = 0;

        gameVariables.Mobs.Mob.forEach(function (item) {

            Mobs[i] = game.add.sprite(item.StartingX, item.StartingY, item.Spritesheet, item.FileName);

            Mobs[i].anchor.setTo(0.5, 0.5);

            Mobs[i].width = 75;
            Mobs[i].height = 75;

            if (item.Visible == 'false' || item.Defeated == 'true') {

                Mobs[i].enable = false;
                Mobs[i].visible = false;

            }

            item.SpriteObj = i;

            i++;

        });

    },

    initializeHud: function () {

        //Health Icon
        hudText.healthIcon = game.add.sprite(gameProperties.screenWidth - 65, 20, 'rpg', 'heart.png');
        hudText.healthIcon.anchor.setTo(0.5, 0.5);
        hudText.healthIcon.fixedToCamera = true;

        //Health Text
        hudText.health = game.add.text(gameProperties.screenWidth - 50, 8, gameVariables.player.hitpoints);
        hudText.health.fixedToCamera = true;

        //Option Icon
        hudText.optionIcon = game.add.sprite(25, gameProperties.screenHeight - 25, 'rpg', 'tools.png');
        hudText.optionIcon.anchor.setTo(0.5, 0.5);
        hudText.optionIcon.fixedToCamera = true;
        hudText.optionIcon.inputEnabled = true;
        hudText.optionIcon.events.onInputDown.add(function () {
            saveGame();
            game.state.start('mainMenu');
        }, this);

        //Gold Icon
        hudText.goldIcon = game.add.sprite(gameProperties.screenWidth - 130, 20, 'rpg', 'coin.png');
        hudText.goldIcon.anchor.setTo(0.5, 0.5);
        hudText.goldIcon.fixedToCamera = true;

        //Gold Text
        hudText.gold = game.add.text(gameProperties.screenWidth - 110, 8, gameVariables.player.gold);
        hudText.gold.fixedToCamera = true;

    },

    updateHud: function () {
        hudText.health.setText(gameVariables.player.hitpoints);
        hudText.gold.setText(gameVariables.player.gold);
    },

    movePlayer: function () {

        if (game.input.activePointer.isUp) {
            playerMoveCount = 0;
        }

        if (game.input.activePointer.isDown) {

            playerMoveCount++;

            if (playerMoveCount < 2 && gameVariables.gamePlay.playerMoving == false) {

                var newX = game.input.worldX;
                var newY = game.input.worldY;

                if (newX > playerSprite.x) {
                    if (newX - playerSprite.x > Math.abs(newY - playerSprite.y)) {
                        //Move RIGHT
                        movePlayerDir('right');
                    } else {
                        if (newY > playerSprite.y) {
                            //Move DOWN
                            movePlayerDir('down');

                        } else {
                            //Move UP
                            movePlayerDir('up');
                        }
                    }
                } else {
                    if (playerSprite.x - newX > Math.abs(newY - playerSprite.y)) {
                        //MOVE LEFT
                        movePlayerDir('left');
                    } else {
                        if (newY > playerSprite.y) {
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

function collide(mob) {

    battleMobs = [];

    battleMobs.push(mob);

    game.state.start('battleMain');
}

function movePlayerDir(direction) {


    gameVariables.gamePlay.playerMoving = true;
    var tween;

    if (direction == 'up') {
        var tween = game.add.tween(playerSprite).to({
            y: playerSprite.y - gameVariables.gamePlay.playerMovement
        }, gameVariables.gamePlay.tweenSpeed, Phaser.Easing.Linear.None, true);
    } else if (direction == 'left') {
        var tween = game.add.tween(playerSprite).to({
            x: playerSprite.x - gameVariables.gamePlay.playerMovement
        }, gameVariables.gamePlay.tweenSpeed, Phaser.Easing.Linear.None, true);
    } else if (direction == 'right') {
        var tween = game.add.tween(playerSprite).to({
            x: playerSprite.x + gameVariables.gamePlay.playerMovement
        }, gameVariables.gamePlay.tweenSpeed, Phaser.Easing.Linear.None, true);
    } else if (direction == 'down') {
        var tween = game.add.tween(playerSprite).to({
            y: playerSprite.y + gameVariables.gamePlay.playerMovement
        }, gameVariables.gamePlay.tweenSpeed, Phaser.Easing.Linear.None, true);
    } else {
        console.log('Player move unknown direction');
    }




    tween.onComplete.add(function () {
        gameVariables.gamePlay.playerMoving = false;
        gameVariables.player.positionX = playerSprite.x;
        gameVariables.player.positionY = playerSprite.y;

        saveGame();

    }, this);



}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
