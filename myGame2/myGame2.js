/*global Phaser*/
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
//    scene: {
//        preload: preload,
//        create: create,
//        update: update
//    }
}

// var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game = new Phaser.Game(config);

game.globalVars = {
    
};
var game_state = {
    main: function() {}
};

//game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('star', 'assets/star.png');
    },

    create: function() {
        game.add.sprite(0,0,'star'); 
    },

    update: function() {

    },

};
game.state.add('main', game_state.main);
//game.state.start('main');
