/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/white.jpg');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/Sugar.png');
        game.load.image('block', 'assets/New Piskel (5).png', 32, 32);
        game.load.spritesheet('dude', 'assets/New Piskel (4).png', 32, 32);

    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,'sky'); 
        game.add.sprite(50,20,'star');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        var platform = this.platforms.create(0,0, 'ground');
        var platform1 = this.platforms.create(500, game.world.height - 300, 'ground');
        var platform2 = this.platforms.create(770, game.world.height - 735, 'ground');
        var platform3 = this.platforms.create(0, game.world.height- 600, 'ground');
        var platform4 = this.platforms.create(200, game.world.height - 390, 'ground');
        platform4.body.immovable = true;
        platform4.scale.setTo(0.07,7);
        platform3.body.immovable = true;
        platform3.scale.setTo(20,1)
        platform2.body.immovable = true;
        platform2.scale.setTo(0.1,20);
        platform.body.immovable = true;
        platform1.body.immovable = true;
        var platform4 = this.platforms.create(300, 400, 'ground');
        //var platform5 = this.platforms.create(
        platform4.body.immovable = true;
        platform4.scale.setTo(1,1);
        platform.scale.setTo(0.1,20);
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        this.stone = game.add.sprite( 200, game.world.height -150, 'block');
        game.physics.arcade.enable(this.stone);
        this.stone.body.gravity.y = 1000;
        this.player = game.add.sprite(50, game.world.height - 150, 'dude');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        //this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        //this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 500;
        this.player.animations.add('left', [0, 1, 2], 10, true);
        this.player.animations.add('right', [3, 4, 5], 10, true);
        this.player.body.collideWorldBounds = true;
        this.stone.body.collideWorldBounds = true;
        var ledge = this.platforms.create(40, 100, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(1.7,1);
        this.cursors = game.input.keyboard.createCursorKeys();



    },

    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stone, this.platforms);
        game.physics.arcade.collide(this.stone, this.player);
        this.player.body.velocity.x = 0;
        this.stone.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play('right');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            //this.stone.body.velocity.x = 150;
            this.player.animations.play('left');
        }
        else {
            this.player.animations.stop();
        }
        if(this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -100
        }
        if(this.cursors.up.isDown && this.player.body.touching.left) {
            this.player.body.velocity.y = -100
        }
        if(this.cursors.up.isDown && this.player.body.touching.right) {
            this.player.body.velocity.y = -100
        }
    },

};
game.state.add('main', game_state.main);
game.state.start('main');
