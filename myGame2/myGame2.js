/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('player', 'assets/player.png')
        game.load.image('object', 'assets/object.png')
    },

    create: function() {
        game.stage.backgroundColor = '#3598db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = game.add.sprite(200, 400, 'player');
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.immovable = true;
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.object = game.add.group();
        this.object.enableBody = true;
        var _this = this;
        setInterval(function() {
            var object = _this.object.create(Math.random() * 800, -64, 'object');
            
        }

    },

    update: function() {

    },

}
game.state.add('main', game_state.main);
game.state.start('main');
