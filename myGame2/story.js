/*global Phaser*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.story = function() {};
game_state.story.prototype = {

    preload: function() {
        game.load.spritesheet('intro', 'assets/Intro Scene.png', 800, 600);
        game.load.spritesheet('speech', 'assets/speech1.png', 783, 381);
    },

    create: function() {
        this.sprite = game.add.sprite(0, 0, 'intro');
        this.sprite.animations.add('story', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 6, false);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        // this.pointer = game.input.Phaser.DeviceButton(this, Phaser.Pointer.LEFT_BUTTON);

        this.speech = game.add.sprite(75, 300, 'speech');
        this.speech.scale.setTo(0.55);
        this.speech.animations.add('speech', [0, 1], 3, false);
        this.speech.animations.add('speech2', [2, 3], 1, false);

        this.text = game.add.text(635, 575, "Press space to start");

        //aligns text
        this.text.anchor.set(0.5);
        this.text.align = 'center';
        this.text.font = 'Courier';
        this.text.fontWeight = 'bold';
        this.text.fontSize = 20;

        this.text.fill = '#fff';
        
        this.text2 = game.add.text(400, 575, "Click to light fire!");
        this.text2.visible = false;
        
        this.text2.anchor.set(0.5);
        this.text2.align = 'center';
        this.text2.font = 'Courier';
        this.text2.fontSize = 20;
        this.text2.fontWeight = 'bold';
        this.text2.fill = '#fff';
        
        this.text3 = game.add.text(635, 575, "Press down arrow\nto continue");
        this.text3.visible = false;
        
        this.text3.anchor.set(0.5);
        this.text3.align = 'center';
        this.text3.font = 'Courier';
        this.text3.fontSize = 20;
        this.text3.fontWeight = 'bold';
        this.text3.fill = '#fff';
        
        this.text4 = game.add.text(635, 575, "Press right arrow to start");
        this.text4.visible = false;
        
        this.text4.anchor.set(0.5);
        this.text4.align = 'center';
        this.text4.font = 'Courier';
        this.text4.fontSize = 20;
        this.text4.fontWeight = 'bold';
        this.text4.fill = '#fff';
    },

    update: function() {
        if (this.spaceKey.isDown) {
            this.speech.animations.play('speech');
            this.text.visible = false;
            this.text2.visible = true;
        }
        
        if(game.input.activePointer.leftButton.isDown) {
            this.sprite.animations.play('story');
            this.text2.visible = false;
            this.text3.visible = true;
        }

        if (this.downKey.isDown) {
            this.speech.animations.play('speech2');
            this.text3.visible = false;
            this.text4.visible = true;
        }
        if (this.rightKey.isDown) {
            game.state.start('title');
        }
    },
};

game.state.add('story', game_state.story);
game.state.start('story');
