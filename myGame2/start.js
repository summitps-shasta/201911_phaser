/*global Phaser game  game_state  */

game_state.story = function() {};
game_state.story.prototype = {
    preload: function() {
        game.load.image('start', 'assets/start.png');
    },
    
    create: function() {
        game.stage.backgroundColor = '#9182ff';
        this.sprite = game.add.sprite(0, 0, 'start');
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },
    
    update: function() {
        if(this.enterKey.isDown) {
            console.log("enter pressed")
            game.state.start('main');
        }
    }
};

game.state.add('story', game_state.story);
// game.state.start('story');
