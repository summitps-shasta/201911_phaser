/*global Phaser game*/

var game_state = {};

game_state.story2 = function() {};
game_state.story2.prototype = {

    preload: function() {
        game.load.image('story', 'assets/story2.png');
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
        
        this.text2 = game.add.text(400, 50, "A forest... I need to find a knife to get any further!");
        
        this.text2.anchor.set(0.5);
        this.text2.align = 'center';
        this.text2.font = 'Courier';
        this.text2.fontWeight = 'bold';
        this.text2.fontSize = 20;

        this.text2.fill = '#fff';
        
	    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    update: function() {
        
        if (this.spaceKey.isDown) {
            game.state.start('level2');
        }
        
    },
}
game.state.add('story2', game_state.story2);