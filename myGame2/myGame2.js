/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {} ;

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/Phaswe.png');
        game.load.image('player', 'assets/MightyMan.png');
        game.load.image('object', 'assets/Pebble.png');
        game.load.image('floor', 'assets/earth.png');
        this.score = 0;
        this.scoreText;
    },

    create: function() {
        game.stage.backgroundColor = '#3598db';

        game.physics.startSystem(Phaser.Physics.ARCADE);
         this.sky = game.add.sprite(0, 0, 'sky');
        this.floor = game.add.sprite(0, 500, 'floor');
        this.player = game.add.sprite(200, 400, 'player');
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.immovable = true;
        this.floor.enableBody = true;
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.objects = game.add.group();
        this.objects.enableBody = true;
        var _this = this;
        setInterval(function () {var object = _this.objects.create(Math.random() * 800, -64, 'object');
        object.body.gravity.y = 300;
        }, 900); // 1000 = 100ms = 1 second
        this.scoreText = game.add.text(100, 100, 'Score: 0', {
        fontSize: '32px',
        fill: '#00fbff'});
    },
    
    update: function() {
        if (this.left.isDown) {
            this.player.body.velocity.x = -500;
        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 500;
        }
        else {
            this.player.body.velocity.x = 0;
        }
        
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
    },
    
    hitObject: function(player, object) {
        object.kill();
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
    },
};

game.state.add('main', game_state.main);
game.state.start('main');