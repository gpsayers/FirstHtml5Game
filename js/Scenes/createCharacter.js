var createChar = function () {};


createChar.prototype = {

    preload: function () {
        game.load.atlas('button','assets/SpriteSheet.png', 'assets/SpriteJSON.json' );
    },

    create: function () {
//        var marker1 = game.add.sprite(0, 0);
//        var marker2 = game.add.sprite(game.camera.width, game.camera.height);
//        this.enableGui(game, marker1, marker2);


        div.style.visibility = 'visible';

        var button = game.add.button(100, 150,'button', this.getData, this, 'g21776.png','g21766.png','g21786.png','g21766.png' );

        button.width = 50;
        button.height = 50;
    },

    update: function () {

    },

    getData: function () {

        playerName = document.getElementById("name").value;

        game.state.start("gameMain");

        div.style.visibility = 'hidden';

    },


};

