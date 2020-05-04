/*  global this, game, game_state, Phaser  */

game_state.intro = function() {};

game_state.intro.prototype = {
    preload: function() {
        game.load.audio('title', 'assets/title.mp3');
        game.load.audio('start', 'assets/start.mp3');
        game.load.image('Moneky', 'assets/Moneky.png');
        game.load.spritesheet('towers', 'assets/towers.png', 800, 600);
        
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.globalVars.running = 0;
        var title = game.add.audio('title');
        title.play();
        game.globalVars.start = game.add.audio('start');
        this.twintowers = game.add.sprite(0,0,'towers');
        this.Moneky = game.add.sprite(0,0, 'Moneky');
        this.twintowers.animations.add('smoke', [0, 1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], 24, true);
        this.twintowers.animations.play('smoke');
        game.input.keyboard.onPressCallback = function(e) {
            console.log("key pressed: ", e);
            if (e == 's') {
                //  disable keyboard callback
                game.globalVars.running = 1;
                game.input.keyboard.onPressCallback = null;
                title.stop();
                game.globalVars.start.play();
                game.state.start('first');
            }
        }

    },
    
    fadePicture: function(){
        game.add.tween(this.Moneky).to( {alpha : 0}, 250, Phaser.Easing.Linear.None, true);
    },
    update: function() {
        game.debug.text('Elapsed seconds: ' + game.time.totalElapsedSeconds(), 32, 32);
        if(game.time.totalElapsedSeconds() >= 9){
            this.fadePicture();
        }
    },
    

};

game.state.add('intro', game_state.intro);