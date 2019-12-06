/*  global Phaser, game, game_state  */

game_state.story = function() {};
game_state.story.prototype = {
    preload: function() {
        game.load.spritesheet('title', 'assets/ioniser-1.png', 600, 600);
    },
    
    create: function() {
        game.stage.backgroundColor = "#000000";
        
        this.title = game.add.sprite(90, 00, 'title');
        this.title.animations.add('colors', [0, 1, 2, 3, 4, 5], 20, true);

        //  Simple check for keyboard, press x to return to intro screen
        game.input.keyboard.onPressCallback = function(e) {
            console.log("key pressed: ", e);
            if (e == 'x') {  //  x key to continue
                //  disable ball timer, disable keyboard callback
                game.input.keyboard.onPressCallback = null;
                game.state.start('main');
            }
        }

    },
    
    update: function() {
        this.title.animations.play('colors');
    },
   
};

game.state.add('story', game_state.story);
