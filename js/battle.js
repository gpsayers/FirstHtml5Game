var battleMain = function () {};

var battleVariables = {
    playerTurn: true,
    mobTurn: false,

};

var optionCount;


var battleTxt = {
    playerHp: {},
    mobHp: {},
    currentAction: {},
    playerName: {},
    enemyName: {},
    playerMana: {},
    mobMana: {},
    optionIcon: {}

};

var battleMenuOptions = {
    startX: 100,
    startY: 425,
    optionGap: 100,
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

    preload: function () {

    },

    create: function () {

        gameVariables.battleVariables = battleVariables;

        optionCount = 0;

        this.initBattleScene();

        this.initBattleMenu();

        //createGrid();

    },

    update: function () {
        this.updateBattleScene();

        checkForDeath();

        if (battleVariables.playerTurn == false && battleVariables.mobTurn == true) {
            getMobAction();
        }



    },

    updateBattleScene: function () {
        battleTxt.playerHp.setText("HP " + gameVariables.player.hitpoints);
        battleTxt.mobHp.setText("HP " + battleMobs[0].HP);

    },


    initBattleScene: function () {
        var optionStyle = {
            font: battleMenuOptions.fontSize + 'pt TheMinion',
            fill: 'white',
            align: 'left',
            stroke: 'rgba(0,0,0,0)',
            strokeThickness: 4
        };

        var enemy = game.add.sprite(475, 75, battleMobs[0].Spritesheet, battleMobs[0].FileName);

        enemy.height = 75;
        enemy.width = 75;


        var player = game.add.sprite(75, 75, 'rpg', 'Magier_0.png');

        player.height = 75;
        player.height = 75;

        battleTxt.playerName = game.add.text(75, 25, gameVariables.player.name, optionStyle);

        battleTxt.playerHp = game.add.text(75, 150, "HP " + gameVariables.player.hitpoints, optionStyle);

        battleTxt.enemyName = game.add.text(475, 25, battleMobs[0].Name, optionStyle);

        battleTxt.mobHp = game.add.text(475, 150, "HP " + battleMobs[0].HP, optionStyle);

        battleTxt.currentAction = game.add.text(game.camera.width / 2, 200, "", optionStyle);

        battleTxt.currentAction.anchor.x = 0.5;
    },

    initBattleMenu: function () {

        var topMenu = new Phaser.Line(0, 400, game.camera.width, 400);
        game.debug.geom(topMenu, '#FFFFFF');

        //var rMenu = new Phaser.Line(100, 300, 100, game.camera.height);
        // game.debug.geom(rMenu, '#FFFFFF');

        battleMenuOptions.menuOptions.forEach(function (item) {
            addMenuOpt(item.choice, item.call);
        });

        //Option Icon
        battleTxt.optionIcon = game.add.sprite(25, gameProperties.screenHeight - 25, 'rpg', 'tools.png');
        battleTxt.optionIcon.anchor.setTo(0.5, 0.5);
        battleTxt.optionIcon.fixedToCamera = true;
        battleTxt.optionIcon.inputEnabled = true;
        battleTxt.optionIcon.events.onInputDown.add(function () {
            saveGame();
            game.state.start('mainMenu');
        }, this);
    },


};

function attack() {

    if (battleVariables.playerTurn == true) {

        battleVariables.playerTurn = false;

        var dmg = game.rnd.integerInRange(5, 15) + 5;

        battleTxt.currentAction.setText("You attack the " + battleMobs[0].Name + " for " + dmg + " damage!");


        battleMobs[0].HP = battleMobs[0].HP - dmg;

        saveGame();

        checkForDeath();

        battleVariables.mobTurn = true;

    }


};

function getMobAction() {

    battleVariables.mobTurn = false;

    //Mob only attacks for now
    game.time.events.add(Phaser.Timer.SECOND * 2, mobAttack, this);



};

function mobAttack() {

    var dmg = game.rnd.integerInRange(0, parseInt(battleMobs[0].stats.str)) + parseInt(battleMobs[0].stats.str);

    battleTxt.currentAction.setText("The " + battleMobs[0].Name + " attacks you for " + dmg + " damage.");


    gameVariables.player.hitpoints = gameVariables.player.hitpoints - dmg;

    saveGame();



    checkForDeath();

    battleVariables.playerTurn = true;

};


function run() {

    if (battleVariables.playerTurn) {

        gameVariables.gamePlay.playerCollide = false;

        saveGame();

        game.state.start('gameMain');
    }


};

function spell() {

    if (battleVariables.playerTurn == true) {

        battleVariables.playerTurn = false;

        var dmg = game.rnd.integerInRange(25, 50) + 10;

        battleTxt.currentAction.setText("You cast Fireball on the " + battleMobs[0].Name + " for " + dmg + " damage!");


        battleMobs[0].HP = battleMobs[0].HP - dmg;

        saveGame();

        checkForDeath();

        battleVariables.mobTurn = true;

    }
};

function item() {

    battleTxt.currentAction.setText("You don't have items.");
};

function checkForDeath() {
    if (gameVariables.player.hitpoints < 1) {
        battleTxt.currentAction.setText("You lose!");

        battleMobs[0].HP = battleMobs[0].MaxHP;

        gameVariables.player.hitpoints = gameVariables.player.maxhitpoints;

        game.time.events.add(Phaser.Timer.SECOND * 2, run, this);
    }

    if (battleMobs[0].HP < 1) {
        battleMobs[0].Defeated = 'true';

        saveGame();

        game.time.events.add(Phaser.Timer.SECOND * 2, function () {
            battleTxt.currentAction.setText("You win!");

            game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                game.state.start('gameMain');
            }, this);
        }, this);


    }
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

    var txt = game.add.text((optionCount * battleMenuOptions.optionGap) + battleMenuOptions.startX, battleMenuOptions.startY, text, optionStyle);

    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);

    optionCount++;


};
