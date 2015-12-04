var gameMain = function () {};

var gameVariables = {
    player: {
        hitpoints: 100,
        experience: 0,
        gold: 0,
        positionX: 400,
        positionY: 400,

    },

};

var hudText = {
    health: {},
    experience: {},
    gold: {}
}

var battleEnemies = [];

gameMain.prototype = {

    preload: function () {
        game.load.atlasJSONHash('rpg', 'assets/SpriteSheet.png', 'assets/SpriteJSON.json');

        game.load.tilemap('level', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('gameTiles', 'assets/grass-tiles-2-small.png');


    },

    create: function () {

        map = game.add.tilemap('level');

        map.addTilesetImage('grass-tiles-2-small', 'gameTiles');

        backgroundlayer = map.createLayer('Background');

        backgroundlayer.resizeWorld();

        wiz = game.add.sprite(gameVariables.player.positionX, gameVariables.player.positionY, 'rpg', 'Magier_0.png');

        wiz.anchor.setTo(0.5, 0.5);

        orc = game.add.sprite(50, 50, 'rpg', 'orc_1.png');

        orc.anchor.setTo(0.5, 0.5);

        game.camera.follow(wiz);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.enable([wiz, orc], Phaser.Physics.ARCADE);

        this.initializeHud();

        game.state.add('battleMain', battleMain);

    },

    update: function () {
        this.moveWizard(MouseEvent);
        this.updateHud();
        game.physics.arcade.overlap(wiz, orc, this.collideDoStuff, null, this);

    },

    collideDoStuff: function () {

        game.state.start('battleMain');

        this.getEnemies(1);

    },


    initializeHud: function () {
        hudText.health = game.add.text(gameProperties.screenWidth - 200, 20, "Health: " + gameVariables.player.hitpoints);

        hudText.health.fixedToCamera = true;
    },

    updateHud: function () {
        hudText.health.setText("Health: " + gameVariables.player.hitpoints);
    },

    moveWizard: function (dat) {

        if (game.input.activePointer.isUp) {
            _isDown = false;
        }

        if (game.input.activePointer.isDown) {
            if (!_isDown) {
                _isDown = true;
                var newX = this.game.input.worldX;
                var newY = this.game.input.worldY;

                //console.log(" wizx:" + wiz.x + " " + "wizy:" + wiz.y + "  newX:" + newX + " " + "newY:" + newY);

                if (newX > wiz.x) {
                    if (newX - wiz.x > Math.abs(newY - wiz.y)) {
                        //Move RIGHT
                        moveRight();
                    } else {
                        if (newY > wiz.y) {
                            //Move DOWN
                            moveDown();

                        } else {
                            //Move UP
                            moveUp();
                        }
                    }

                } else {
                    if (wiz.x - newX > Math.abs(newY - wiz.y)) {
                        //MOVE LEFT
                        moveLeft();
                    } else {
                        if (newY > wiz.y) {
                            //MOVE DOWN
                            moveDown();
                        } else {
                            //MOVE UP
                            moveUp()
                        }
                    }
                }
            }

        }

        gameVariables.player.positionX = wiz.x;
        gameVariables.player.positionY = wiz.y;

    },

    getEnemies: function (battleId) {
        battleEnemies = new Array();

        battleEnemies.push('orc_1.png');
    },

};

function moveDown() {
    tween = game.add.tween(wiz).to({
        x: wiz.x,
        y: wiz.y + wiz.height
    }, 500, Phaser.Easing.Linear.None, true);
}

function moveRight() {
    tween = game.add.tween(wiz).to({
        x: wiz.x + wiz.width,
        y: wiz.y
    }, 500, Phaser.Easing.Linear.None, true);
}

function moveLeft() {
    tween = game.add.tween(wiz).to({
        x: wiz.x - wiz.width,
        y: wiz.y
    }, 500, Phaser.Easing.Linear.None, true);
}

function moveUp() {
    tween = game.add.tween(wiz).to({
        x: wiz.x,
        y: wiz.y - wiz.height
    }, 500, Phaser.Easing.Linear.None, true);
}
