/*global Phaser*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.story = function() {};
game_state.story.prototype = {

    preload: function() {
        game.load.spritesheet('intro', 'assets/Intro Scene.png', 800, 600);
        game.load.image('speech1', 'assets/speech1.png');
        game.load.image('speech2', 'assets/speech2.png');
        game.load.image('speech3', 'assets/speech3.png');
        game.load.image('speech4', 'assets/speech4.png');
    },

     create: function() {
         this.sprite = game.add.sprite(0, 0, 'intro');
         this.sprite.animations.add('story', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13 ,14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 6, false);
         this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
         
         this.speech1 = game.add.sprite(175, 325, 'speech1');
         this.speech1.scale.setTo(0.55);
         this.speech1.visible = true;
         
         this.speech2 = game.add.sprite(75, 325, 'speech2');
         this.speech2.scale.setTo(0.55);
         this.speech2.visible = false;
         
         this.speech3 = game.add.sprite(75, 325, 'speech3');
         this.speech3.scale.setTo(0.55);
         this.speech3.visible = false;
         
         this.speech4 = game.add.sprite(75, 325, 'speech4');
         this.speech4.scale.setTo(0.55);
         this.speech4.visible = false;
         },

    update: function() {
        if (this.spaceKey.isDown) {
        this.sprite.animations.play('story');
        }
        if (this.sprite.animations.isPlay) {
            this.sprite.frame = 24;
        }
    },
};

game.state.add('story', game_state.story);
game.state.start('story');
