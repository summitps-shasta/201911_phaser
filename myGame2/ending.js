/*global Phaser game game_state*/
var game_state = {}

game_state.ending = function() {};
game_state.ending.prototype = {

    preload: function() {
        game.load.image('ending', 'assets/winscreen.png');

    },

    create: function() {
        game.add.sprite(0, 0, 'ending');
    },

    update: function() {
        
    },
};
game.state.add('ending', game_state.ending);

// game.state.start('main');