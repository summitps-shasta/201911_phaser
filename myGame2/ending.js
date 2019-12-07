/*global Phaser game game_state*/

game_state.ending = function() {};
game_state.ending.prototype = {

    preload: function() {
        game.load.spritesheet('ending', 'assets/Intro Scene.png', 800, 600);
        game.load.spritesheet('the end', 'assets/the end.png', 800, 600);
        game.load.image('speechA', 'assets/speechA.png');
    },

    create: function() {
        this.ending = game.add.sprite(0, 0, 'ending');
        this.ending.animations.add('ending', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15], 6, false);
        // this.ending.animations.add('ending2', [12, 13, 14, 15], 6, true);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
        this.credits = game.add.sprite(0, 0, 'the end');
        this.credits.visible = false;
        
        this.text = game.add.text(635, 575, "Press right arrow to end");
        this.text.visible = false;

        //aligns text
        this.text.anchor.set(0.5);
        this.text.align = 'center';
        this.text.font = 'Courier';
        this.text.fontWeight = 'bold';
        this.text.fontSize = 20;

        this.text.fill = '#fff';
        
        this.text2 = game.add.text(400, 575, "Click to light fire!");
        this.text2.visible = true;
        
        this.text2.anchor.set(0.5);
        this.text2.align = 'center';
        this.text2.font = 'Courier';
        this.text2.fontSize = 20;
        this.text2.fontWeight = 'bold';
        this.text2.fill = '#fff'; 
        
        this.text3 = game.add.text(635, 575, "Press down arrow to continue");
        this.text3.visible = false;
        
        this.text3.anchor.set(0.5);
        this.text3.align = 'center';
        this.text3.font = 'Courier';
        this.text3.fontSize = 20;
        this.text3.fontWeight = 'bold';
        this.text3.fill = '#fff';
        
        this.speechA = game.add.sprite(150, 325, 'speechA');
        this.speechA.scale.setTo(0.30);
    },

    update: function() {
         
        
        //change to mouse click
        if (game.input.activePointer.leftButton.isDown) {
            this.speechA.visible = false;
            this.ending.animations.play('ending');
            this.text2.visible = false;
            this.text.visible = true;
        }
        
        
        if (this.rightKey.isDown) {
            this.text.visible = false;
            this.credits.visible = true;
        }
    },
};

game.state.add('ending', game_state.ending);
// game.state.start('ending');
