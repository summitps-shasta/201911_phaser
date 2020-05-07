/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.story1 = function() {};
game_state.story1.prototype = {

    preload: function() {
        game.load.image('story', 'assets/story1.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'story');
        
         this.text = game.add.text(635, 575, "Press space to continue");

        //aligns text
        this.text.anchor.set(0.5);
        this.text.align = 'center';
        this.text.font = 'Courier';
        this.text.fontWeight = 'bold';
        this.text.fontSize = 20;

        this.text.fill = '#fff';
        
        this.text2 = game.add.text(400, 50, "I need to get out of here!");
        
        this.text2.anchor.set(0.5);
        this.text2.align = 'center';
        this.text2.font = 'Courier';
        this.text2.fontWeight = 'bold';
        this.text2.fontSize = 40;

        this.text2.fill = '#fff';
        
	    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    update: function() {
        
        if (this.spaceKey.isDown) {
            game.state.start('main');
        }
        
    },
}
game.state.add('story1', game_state.story1);
game.state.start('story1');