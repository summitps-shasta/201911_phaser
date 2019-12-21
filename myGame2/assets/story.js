/*global Phaser game game_state*/
var game_state = {}

game_state.story = function() {};
game_state.story.prototype = {

    preload: function() {
        game.load.image('intro', 'assets/press.png');

    },

    create: function() {
        game.add.sprite(0, 0, 'intro');

        game.input.keyboard.onPressCallback = function(s) {
                game.state.start('main');
        };

    },

    update: function() {
        
    },
};
game.state.add('story', game_state.story);
game.state.start('story');

// game.state.start('main');