/*global Phaser game*/

var game_state = {}

game_state.level2 = function() {};
game_state.level2.prototype = {

    preload: function() {
        game.load.image('wall', 'assets/wall-1.png (1).png')
    },
    
    create: function() {
        game.add.sprite(0, 0, 'wall');
    },
    
    update: function() {
        
    },
};

game.state.add('level2', game_state.level2);