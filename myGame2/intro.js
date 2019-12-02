/*  global this, game, game_state, Phaser  */

game_state.intro = function() {};

game_state.intro.prototype = {

    preload: function() {
        game.load.image('player', 'assets/player.png');
    },

    create: function() {
        game.stage.backgroundColor = '#009800';

        this.player = game.add.sprite(200, 400, 'player');
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.immovable = true;
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    },

    update: function() {
        if (this.left.isDown) {
            game.state.start('main');
            //  alert('down');
        }
        else if (this.right.isDown) {
            game.state.start('main');
            //  alert('down');
        }
    }

};

game.state.add('intro', game_state.intro);
