var test = function () { };

game.gui = new RSGUI(game);


test.prototype = {

    preload: function () {

    },

    create: function () {
        button1 = game.gui.add.button(10, 400, "Done");
        button1.events.onInputUp.add(this.getData);

        text = game.gui.add.textinput(10, 100, "Character Name");
    },

    update: function () {

    },

    getData: function () {
        console.log(text._text);


    }
};