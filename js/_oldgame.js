/**
 * Created by Garth on 12/1/2015.
 */
var BasicGame = {};

var game = new Phaser.Game(480,600,Phaser.AUTO,'gameDiv');


BasicGame.MainMenu = function(){};

BasicGame.MainMenu.prototype = {

    preload: function() {
    },
    create: function() {
        var style = { font: "65px Arial", fill: "#ff0044", align: "center", wordWrap: true, wordWrapWidth: 480 };

        var text = game.add.text(game.world.centerX, game.world.centerY, "- Game Start - \n Press any key to continue.", style);

        text.anchor.set(0.5);

    },
    update: function() {

        if (game.input.activePointer.isDown)
        {
            this.state.start('Level1');

        }

    }


}

BasicGame.Level1 = function(){};

BasicGame.Level1.prototype = {
    preload: function() {
        preload()
    },
    create: function() {
        create()
    },
    update: function() {
        update()
    }
}

BasicGame.Battle = function(){};

BasicGame.Battle.prototype = {
    preload: function() {
        game.load.atlasJSONHash('wizard','assets/SpriteSheet.png','assets/SpriteJSON.json');
    },
    create: function() {

        wiz = game.add.sprite(game.world.centerX,game.world.centerY,'wizard','Magier_0.png');

        wiz.anchor.setTo(0.5,0.5);


        var style = { font: "65px Arial", fill: "#ff0000", align: "center" };

        var text = game.add.text(game.world.centerX, game.world.centerY + 100, "BATTLE!", style);

        text.anchor.set(0.5);

        this.game.camera.focusOnXY(game.world.centerX, game.world.centerY);
    },
    update: function() {
        if (game.input.activePointer.isDown)
        {
            this.state.start('Level1');

        }
    }
}

game.state.add('MainMenu',BasicGame.MainMenu);
game.state.add('Level1',BasicGame.Level1);
game.state.add('Battle',BasicGame.Battle);
game.state.start('MainMenu');

//var game = new Phaser.Game(480,600,Phaser.AUTO,'',{preload: preload, create: create, update: update});

function preload() {


    game.load.atlasJSONHash('rpg','assets/SpriteSheet.png','assets/SpriteJSON.json');

    game.load.tilemap('level','assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('gameTiles','assets/grass-tiles-2-small.png');

}

var tween;

function create() {

    this.map = this.game.add.tilemap('level');


    this.map.addTilesetImage('grass-tiles-2-small','gameTiles');

    this.backgroundlayer = this.map.createLayer('Background');

    this.backgroundlayer.resizeWorld();

    wiz = game.add.sprite(400,400,'rpg','Magier_0.png');

    wiz.anchor.setTo(0.5,0.5);

    orc = game.add.sprite(50,50,'rpg','orc_1.png');

    orc.anchor.setTo(0.5,0.5);

    this.game.camera.follow(this.wiz);

    //game.input.keyboard.addCallbacks(null,null, onKeyUp)

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.enable([wiz,orc],Phaser.Physics.ARCADE);
    //game.input.onDown.add(mouseMove, this);

    //game.input.activePointer.isUp.add(mouseMove, this)

}

function update() {
    if (game.input.activePointer.isDown)
    {
        if (!_isDown) {
            _isDown = true;
            onClickFunction(MouseEvent);
        }

    }
    if (game.input.activePointer.isUp) {
        //onReleaseFunction();
        _isDown = false;
    }

    //game.physics.arcade.collide(this.wiz,this.orc,this.collideDoStuf,null,this);
    game.physics.arcade.overlap(this.wiz,this.orc,this.collideDoStuf,null,this);
}

function collideDoStuf(obj1,obj2)
{
    game.state.start('Battle');
    console.log("collide");
}

function onClickFunction(dat)
{
    var newX = this.game.input.worldX;
    var newY = this.game.input.worldY;

    //console.log(" wizx:" + wiz.x + " " + "wizy:" + wiz.y + "  newX:" + newX + " " + "newY:" + newY);

    if (newX > wiz.x)
    {
        if (newX - wiz.x > Math.abs(newY - wiz.y))
        {
            //Move RIGHT
            moveRight();
        }
        else
        {
            if (newY > wiz.y) {
                //Move DOWN
                moveDown();

            }
            else
            {
                //Move UP
                moveUp();
            }
        }

    }
    else {
        if (wiz.x - newX > Math.abs(newY - wiz.y))
        {
            //MOVE LEFT
            moveLeft();
        }
        else
        {
            if (newY > wiz.y)
            {
                //MOVE DOWN
                moveDown();
            }
            else
            {
                //MOVE UP
                moveUp()
            }
        }
    }

}

function onKeyUp(event) {

    switch(event.keyCode) {
        case Phaser.Keyboard.DOWN:
            //wiz.y = wiz.y + wiz.height;
            moveDown()
            break;
        case Phaser.Keyboard.UP:
            //wiz.y = wiz.y - wiz.height;
            moveUp();
            break;
        case Phaser.Keyboard.LEFT:
            //wiz.x = wiz.x - wiz.width;
            moveLeft();
            break;
        case Phaser.Keyboard.RIGHT:
            moveRight()
            break;
    }

}

function moveDown()
{
    tween = game.add.tween(wiz).to({x: wiz.x, y: wiz.y + wiz.height},500,Phaser.Easing.Linear.None, true);
}

function moveRight()
{
    tween = game.add.tween(wiz).to({x: wiz.x + wiz.width, y: wiz.y},500,Phaser.Easing.Linear.None, true);
}

function moveLeft()
{
    tween = game.add.tween(wiz).to({x: wiz.x - wiz.width, y: wiz.y},500,Phaser.Easing.Linear.None, true);
}

function moveUp()
{
    tween = game.add.tween(wiz).to({x: wiz.x, y: wiz.y - wiz.height},500,Phaser.Easing.Linear.None, true);
}
