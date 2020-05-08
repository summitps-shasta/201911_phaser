/*  global this, game, game_state, Phaser  */

game_state.dead = function() {};

game_state.dead.prototype = {
    preload: function() {
        game.load.image('youdied','assets/youdiedtext.jpg');
    },

    create: function() {
        game.sound.stopAll();
        
        
    },

    update: function() {
        if(game.globalVars.damage >= 10){
            game.add.sprite(0,0,'youdied');
        }
        if(game.globalVars.damage < 10){
            game.debug.text('Thank you for play the demo version of ESCAPE WTC 2',32,32);
        }
        
        
        
        
    },
    
    
    

};

game.state.add('dead', game_state.dead);