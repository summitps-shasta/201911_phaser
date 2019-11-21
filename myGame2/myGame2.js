/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('player', 'assets/player.png');
        game.load.image('object', 'assets/object.png');
        game.load.spritesheet('that', 'assets/that.png', 320, 320);

    },



    create: function() {
        game.stage.backgroundColor = '#3598db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = game.add.sprite(200, 300, 'that');

        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        
        this.player.animations.add('move', [0], 10, true);
        this.player.body.setSize(300, 300, 10, 10);
        
        this.player.body.immovable = true;

        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.objects = game.add.group();
        this.objects.enableBody = true;

        var _this = this;
        setInterval(function() {
            var object = _this.objects.create(Math.random() * 800, -64, 'object');
            object.body.gravity.y = 300;
        }, 1000);
    },


    update: function() {
        if (this.left.isDown) {
            this.player.body.velocity.x = -300;
            this.player.animations.play('move');
        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 300;
            this.player.animations.play('move');
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 1;
        }
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);


    },

    hitObject: function(player, object) {
        object.kill();
    }

};
game.state.add('main', game_state.main);
game.state.start('main');
