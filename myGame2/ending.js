/*global Phaser */
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};
game_state.ending = function() {};
game_state.ending.prototype = {
    
    create: function() {
        //Set the background color to blue
        game.stage.backgroundCOlor = '#000000';
        
      this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      
      this.title = game.add.text(400, 300, "Game Over");
      this.title.anchor.set(0.5);
      this.title.font = 'Courier';
      this.title.fontWeight = 'bold';
      this.title.fontSize = 70;
      this.title.fill = '#fff';
      
      this.title = game.add.text(400, 400, "PRESS ENTER TO GO BACK");
      this.title.anchor.set(0.5);
      this.title.font = 'Courier';
      this.title.fontWeight = 'bold';
      this.title.fontSize = 30;
      this.title.fill = '#fff';
        
    },
    
    update: function() {
      if(this.enterKey.isDown) {
          game.state.start('title');
      }  
    },
};
game.state.add('ending', game_state.ending);