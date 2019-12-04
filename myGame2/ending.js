/*global Phaser game game_state*/
game_state.ending = function() {};
game_state.ending.prototype = {

    preload: function() {
        game.load.spritesheet('ending', 'assets/Intro Scene.png', 800, 600);
        game.load.spritesheet('the end', 'assets/the end.png', 800, 600);
    },

    create: function() {
        this.ending = game.add.sprite(0, 0, 'ending');
        this.sprite.animations.add('ending', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 6, false);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.credits = game.add.sprite(0, 0, 'the end');
        this.credits.visible = false;
        
        this.text = game.add.text(635, 575, "Press space to continue");

        //aligns text
        this.text.anchor.set(0.5);
        this.text.align = 'center';
        this.text.font = 'Courier';
        this.text.fontWeight = 'bold';
        this.text.fontSize = 20;

        this.text.fill = '#fff';
    },

    update: function() {
        
         if (this.sprite.animations.isPlay) {
            this.sprite.frame = 24;
        }

        if (this.spaceKey.isDown) {
            if (this.counter == 0) {
                this.speechA.visible = false;
                this.speechB.visible = true;
                this.counter++;
            }
            else if (this.counter == 1) {
                this.speechB.visible = false;
                this.sprite.animations.play('story');
                this.counter++;
            }
            else if (this.counter == 4) {
                this.credits.visible = true;
            }
        }
    },
};

game.state.add('ending', game_state.ending);
// game.state.start('ending');
