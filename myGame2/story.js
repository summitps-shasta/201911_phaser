/*global Phaser game*/
var game_state = {};

game_state.story = {
    preload: function() {

    },

    create: function() {
        game.stage.backgroundColor = '#55677d';
        
        
         //  Simple check for keyboard, press x to return to intro screen
        game.input.keyboard.onPressCallback = function(e) {
            console.log("key pressed: ", e);
            if (e == 'x') {
                //  disable ball timer, disable keyboard callback
                game.input.keyboard.onPressCallback = null;
                game.state.start('main');
            }
        };

        
    },
    update: function() {
        
    },
};
game.state.add('story', game_state.story);
game.state.start('story');