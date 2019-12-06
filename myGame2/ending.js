/*  global Phaser game game_state  */

game_state.ending = function() {};
game_state.ending.prototype = {
    preload: function() {
        game.load.spritesheet('win', 'assets/win.png', 800, 362);
    },
    
    create: function() {
        game.stage.backgroundColor = '#000000'
        this.ending = game.add.sprite(0, 119, 'win');
        this.ending.animations.add('rainbow', [0,1,2,3,4,5,6], 20 , true);
        
    },
    
        
    
    
    update: function() {
        this.ending.animations.play('rainbow');
        
    },

};
game.state.add('ending', game_state.ending);