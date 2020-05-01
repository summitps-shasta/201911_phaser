/*  global this, game, game_state, Phaser  */

game_state.second = function() {};

game_state.second.prototype = {
    preload: function() {
        game.load.spritesheet('room2','assets/room2.png',800,600);
    },

    create: function() {
        this.room = game.add.sprite(0,0,'room2');
        game.debug.text('Level 1 Under Construction',32,32);

    },
    
    update: function() {
        
    },
    

};

game.state.add('second', game_state.second);