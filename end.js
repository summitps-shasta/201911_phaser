/*global Phaser game*/

var game_state = {};

game_state.end = function() {};
game_state.end.prototype = {

    preload: function() {
        game.load.image('end', 'assets/the end clone.png');
    },

    create: function() {
        this.end = game.add.sprite(0, 0, 'end');
        this.end.visible = false;
        
         this.text = game.add.text(635, 575, "Press space to continue");

        //aligns text
        this.text.anchor.set(0.5);
        this.text.align = 'center';
        this.text.font = 'Courier';
        this.text.fontWeight = 'bold';
        this.text.fontSize = 20;

        this.text.fill = '#fff';
        
        this.text2 = game.add.text(400, 300, "Our adventurer makes it home, safe and sound.");
        
        this.text2.anchor.set(0.5);
        this.text2.align = 'center';
        this.text2.font = 'Courier';
        this.text2.fontWeight = 'bold';
        this.text2.fontSize = 20;

        this.text2.fill = '#fff';
        
	    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    update: function() {
        
        if(this.spaceKey.isDown) {
            this.text.visible = false;
            this.text2.visible = false;
            this.end.visible = true;
        }
        
    },
}
game.state.add('end', game_state.end);