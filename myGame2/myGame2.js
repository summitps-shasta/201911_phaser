/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}
var spacebar;
var b;
var turnphase = 'undefined';

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {

        game.load.image('sky', 'assets/sky.png');
        game.load.spritesheet('chest', 'assets/chest.png', 250, 250);
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        game.load.image('star', 'assets/star.png');
    },

    create: function() {

        //creates hand
        this.myHand = new Array('undefined', 'undefined', 'undefined', 'undefined', 'undefined');

        //turn phases
        this.turnphase = undefined;

        //keyboard: cursors
        this.cursors = game.input.keyboard.createCursorKeys();
        //keyboard: spacebar
        spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //keyboard: b
        b = game.input.keyboard.addKey(Phaser.Keyboard.B);



        //background
        game.add.sprite(0, 0, 'sky');


        //chest
        this.chest = game.add.sprite(160, 125, 'chest');
        //chest: animations (useless)
        // this.chest.animations.add('closing', [0, 1], 20, false);
        //chest: resting
        this.chest.visible = false;
        this.chest.frame = 1;

        //baddie
        game.add.sprite(0, 250, 'baddie');

        //cards
        this.cards = game.add.array('undefined', 'undefined', 'undefined', 'undefined', 'undefined')
    },

    update: function() {

        //calls turnphase: drawing
        if (this.cursors.up.isDown) {
            this.turnphase = 'drawing';
        }

        //chest: drawing phase
        if (this.turnphase == 'drawing') {
            this.chest.visible = true;
            // this.chest.frame = 1;
                //chest: drawing action cards
            if ((b.isDown)) {
                this.chest.frame = 0;
            }
            else if ((spacebar.isDown)) {
                this.chest = new Array(game.rnd.integerInRange(0, 1)*5);
            }
            else {
                this.chest.frame = 1;
            }
        }

    },



    render: function() {
        game.debug.text(this.myHand, 32, 32);
    },

}
game.state.add('main', game_state.main);
game.state.start('main');
