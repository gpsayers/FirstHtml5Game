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

var enemy = {
    ID: 1,
    Name: "",
    HP: "",
    Exp: "",
    Speed: "",
    Level: 1,
    StartingX: 10,
    StartingY: 10,
    Visible: true
};

var Mobs;

var hudText = {
    health: {},
    experience: {},
    gold: {}
};

var wiz;

var battleEnemies = [];

var group;

gameMain.prototype = {

    preload: function () {
        game.load.atlasJSONHash('rpg', 'assets/SpriteSheet.png', 'assets/SpriteJSON.json');

        game.load.tilemap('level', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('gameTiles', 'assets/grass-tiles-2-small.png');

        game.load.json('mobs', 'assets/json/mobs.json');
    },

    create: function () {

        map = game.add.tilemap('level');

        map.addTilesetImage('grass-tiles-2-small', 'gameTiles');

        backgroundlayer = map.createLayer('Background');

        backgroundlayer.resizeWorld();

        game.physics.startSystem(Phaser.Physics.ARCADE);


        this.initMobs();

        //        orc = game.add.sprite(50, 50, 'rpg', 'orc_1.png');
        //
        //        orc.anchor.setTo(0.5, 0.5);
        //
        //        orc2 = game.add.sprite(200, 200, 'rpg', 'orc_1.png');
        //
        //        orc2.anchor.setTo(0.5, 0.5);

        //group.add(orc);

        //group.add(orc2);

        wiz = game.add.sprite(gameVariables.player.positionX, gameVariables.player.positionY, 'rpg', 'Magier_0.png');

        wiz.anchor.setTo(0.5, 0.5);

        game.camera.follow(wiz);

        //game.physics.enable([wiz,group], Phaser.Physics.ARCADE);
        //game.physics.enable([wiz, orc], Phaser.Physics.ARCADE);

        game.physics.enable(wiz, Phaser.Physics.ARCADE);


        this.initializeHud();

        game.state.add('battleMain', battleMain);

    },

    update: function () {
        this.moveWizard();
        this.updateHud();
        //game.physics.arcade.overlap(wiz, group, this.collideDoStuff, null, this);
        //game.physics.arcade.overlap(wiz, orc, this.collideDoStuff, null, this);
        Mobs.Mob.forEach(function (item) {
            if (checkOverlap(wiz, item.SpriteObj)) {
                collide(item.ID);
            }

            //game.physics.arcade.overlap(wiz, item.SpriteObj, this.collideDoStuff, null, this);
        });

    },

    initMobs: function (group) {

        Mobs = game.cache.getJSON('mobs');

        Mobs.Mob.forEach(function (item) {

            //if (item.Visible) {
            //orc = game.add.sprite(item.StartingX, item.StartingY, item.Spritesheet, item.FileName);
            item.SpriteObj = game.add.sprite(item.StartingX, item.StartingY, item.Spritesheet, item.FileName);

            //orc.anchor.setTo(0.5, 0.5);
            item.SpriteObj.anchor.setTo(0.5, 0.5);

            //group.add(orc);
            //group.add(item.SpriteObj);

            //item.SpriteObj = orc;
            //game.physics.enable([wiz, item.SpriteObj], Phaser.Physics.ARCADE);

            //}

        });

        //orc = game.add.sprite(50, 50, 'rpg', 'orc_1.png');

        //orc.anchor.setTo(0.5, 0.5);

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

    moveWizard: function () {

        if (game.input.activePointer.isUp) {
            _isDown = false;
        }

        if (game.input.activePointer.isDown) {
            if (!_isDown) {
                _isDown = true;
                var newX = this.game.input.worldX;
                var newY = this.game.input.worldY;

                if (newX > wiz.x) {
                    if (newX - wiz.x > Math.abs(newY - wiz.y)) {
                        //Move RIGHT
                        movePlayer('right');
                        //moveRight();
                    } else {
                        if (newY > wiz.y) {
                            //Move DOWN
                            movePlayer('down');
                            //moveDown();

                        } else {
                            //Move UP
                            movePlayer('up');
                            // moveUp();
                        }
                    }
                } else {
                    if (wiz.x - newX > Math.abs(newY - wiz.y)) {
                        //MOVE LEFT
                        movePlayer('left');
                        // moveLeft();
                    } else {
                        if (newY > wiz.y) {
                            //MOVE DOWN
                            movePlayer('down');
                            //moveDown();
                        } else {
                            //MOVE UP
                            movePlayer('up');
                            //moveUp()
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

function collide(id) {


    battleEnemies = new Array();

    battleEnemies.push('orc_1.png');

    game.state.start('battleMain', true, false, Mobs.Mob[0]);
}

function movePlayer(direction) {

    switch (direction) {
    case 'down':
        tween = game.add.tween(wiz).to({
            x: wiz.x,
            y: wiz.y + wiz.height
        }, 500, Phaser.Easing.Linear.None, true);
        break;
    case 'up':
        tween = game.add.tween(wiz).to({
            x: wiz.x,
            y: wiz.y - wiz.height
        }, 500, Phaser.Easing.Linear.None, true);
        break;
    case 'left':
        tween = game.add.tween(wiz).to({
            x: wiz.x - wiz.width,
            y: wiz.y
        }, 500, Phaser.Easing.Linear.None, true);
        break;
    case 'right':
        tween = game.add.tween(wiz).to({
            x: wiz.x + wiz.width,
            y: wiz.y
        }, 500, Phaser.Easing.Linear.None, true);
        break;
    default:
    }

}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
