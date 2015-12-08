var battleMain = function () {};

var battleVariables = {
    playerTurn: true,
    mobTurn: false,

};

var optionCount;
var baddie;

var battleTxt = {
    playerHp: {},
    mobHp: {},
    currentAction: {},
};

var battleMenuOptions = {
    startX: 10,
    startY: 300,
    optionGap: 30,
    fontSize: 20,
    menuOptions: [{
            choice: "Attack",
            call: attack
        },
        {
            choice: "Spell",
            call: spell
        },
        {
            choice: "Item",
            call: item
        },
        {
            choice: "Run",
            call: run
        }
             ],
};


battleMain.prototype = {
    init: function (Mob) {
        baddie = Mob;
    },

    preload: function () {

    },

    create: function () {

        optionCount = 1;

        this.initBattleScene();

        this.initBattleMenu();

        //createGrid();

    },

    update: function () {
        this.updateBattleScene();

        this.checkForDeath();

        if (battleVariables.playerTurn == false && battleVariables.mobTurn == true) {
            getMobAction();
        }



    },

    updateBattleScene: function () {
        battleTxt.playerHp.setText("HP " + gameVariables.player.hitpoints);
        battleTxt.mobHp.setText("HP " + baddie.HP);

    },

    checkForDeath: function () {
        if (gameVariables.player.hitpoints < 1) {
            battleTxt.currentAction.setText("You lose!");

            baddie.HP = baddie.MaxHP;

            gameVariables.player.hitpoints = 100;

            game.time.events.add(Phaser.Timer.SECOND * 2, run, this);
        }

        if (baddie.HP < 1) {
            baddie.Defeated = 'true';

            battleTxt.currentAction.setText("You win!");

            UpdateMob(baddie.ID, baddie);

            saveGame();

            game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                game.state.start('gameMain');
            }, this);
        }
    },

    initBattleScene: function () {
        var optionStyle = {
            font: battleMenuOptions.fontSize + 'pt TheMinion',
            fill: 'white',
            align: 'left',
            stroke: 'rgba(0,0,0,0)',
            strokeThickness: 4
        };

        var enemy = game.add.sprite(400, 100, baddie.Spritesheet, baddie.FileName);

        //        battleEnemies.forEach(function (item) {
        //            var enemy = game.add.sprite(400, 100, 'rpg', item);
        //        });

        var wiz = game.add.sprite(100, 100, 'rpg', 'Magier_0.png');

        battleTxt.playerHp = game.add.text(100, 200, "HP " + gameVariables.player.hitpoints, optionStyle);

        battleTxt.mobHp = game.add.text(400, 200, "HP " + baddie.HP, optionStyle);

        battleTxt.currentAction = game.add.text(game.camera.width / 2, 50, "", optionStyle);

        battleTxt.currentAction.anchor.x = 0.5;
    },

    initBattleMenu: function () {

        var topMenu = new Phaser.Line(0, 300, 100, 300);
        game.debug.geom(topMenu, '#FFFFFF');

        var rMenu = new Phaser.Line(100, 300, 100, game.camera.height);
        game.debug.geom(rMenu, '#FFFFFF');

        battleMenuOptions.menuOptions.forEach(function (item) {
            addMenuOpt(item.choice, item.call);
        });
    },


};

function attack() {

    if (battleVariables.playerTurn == true) {

        battleVariables.playerTurn = false;

        var dmg = game.rnd.integerInRange(5, 15) + 5;

        battleTxt.currentAction.setText("You attack the " + baddie.Name + " for " + dmg + " damage!");


        baddie.HP = baddie.HP - dmg;

        UpdateMob(baddie.ID, baddie);

        saveGame();

        battleVariables.mobTurn = true;

    }


};

function getMobAction() {

    battleVariables.mobTurn = false;

    //Mob only attacks for now
    game.time.events.add(Phaser.Timer.SECOND * 2, mobAttack, this);



};

function mobAttack() {

    var dmg = game.rnd.integerInRange(0, parseInt(baddie.stats.str)) + parseInt(baddie.stats.str);

    battleTxt.currentAction.setText("The " + baddie.Name + " attacks you for " + dmg + " damage.");


    gameVariables.player.hitpoints = gameVariables.player.hitpoints - dmg;

    saveGame();

    battleVariables.playerTurn = true;


};


function run() {

    if (battleVariables.playerTurn) {

        baddie.Collide = 'false';

        UpdateMob(baddie.ID, baddie);

        saveGame();

        game.state.start('gameMain');
    }


};

function spell() {

    battleTxt.currentAction.setText("You don't have spells.");
};

function item() {

    battleTxt.currentAction.setText("You don't have items.");
};


function createGrid() {

    var vertLines = {};
    var horzLines = {};

    for (i = 1; i < 10; i++) {
        vertLines['vline' + i] = new Phaser.Line(100 * i, 0, 100 * i, game.camera.height);
        game.debug.geom(vertLines['vline' + i], '#FFFFFF');
    }

    for (i = 1; i < 10; i++) {
        horzLines['hline' + i] = new Phaser.Line(0, 100 * i, game.camera.width, 100 * i);
        game.debug.geom(horzLines['hline' + i], '#FFFFFF');
    }

};

function addMenuOpt(text, callback) {

    var optionStyle = {
        font: battleMenuOptions.fontSize + 'pt TheMinion',
        fill: 'white',
        align: 'left',
        stroke: 'rgba(0,0,0,0)',
        strokeThickness: 4
    };

    var txt = game.add.text(battleMenuOptions.startX, (optionCount * battleMenuOptions.optionGap) + battleMenuOptions.startY, text, optionStyle);

    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);

    optionCount++;


};
