var battleMain = function () {};


var optionCount;
var baddie;

var battleTxt = {
    playerHp: {},
    mobHp: {},
};

var battleMenuOptions = {
    startX: 10,
    startY: 300,
    optionGap: 30,
    fontSize: 15,
    menuOptions: [{
            choice: "Attack",
            call: attack
        },
        {
            choice: "Spell",
            call: test
        },
        {
            choice: "Item",
            call: test
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

    },

    updateBattleScene: function () {
        battleTxt.playerHp.setText("HP " + gameVariables.player.hitpoints);
        battleTxt.mobHp.setText("HP " + baddie.HP);

    },

    initBattleScene: function () {
        var optionStyle = {
            font: battleMenuOptions.fontSize + 'pt TheMinion',
            fill: 'white',
            align: 'left',
            stroke: 'rgba(0,0,0,0)',
            strokeThickness: 4
        };

        battleEnemies.forEach(function (item) {
            var enemy = game.add.sprite(400, 100, 'rpg', item);
        });

        var wiz = game.add.sprite(100, 100, 'rpg', 'Magier_0.png');

        battleTxt.playerHp = game.add.text(100, 300, "HP " + gameVariables.player.hitpoints, optionStyle);

        battleTxt.mobHp = game.add.text(400, 300, "HP " + baddie.HP, optionStyle);
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

    baddie.HP = baddie.HP - 20;
    gameVariables.player.hitpoints--;

    UpdateMob(baddie.ID, baddie);

    saveGame();
};

function run() {

    gameVariables.player.positionY = gameVariables.player.positionY + 40;

    saveGame();

    game.state.start('gameMain');
};

function test() {
    console.log('test clicked');
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
