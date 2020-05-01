/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

var wallTile;

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('platform', 'assets/rock-1.png');
        game.load.spritesheet('girl', 'assets/cc sprite (1).png', 200, 200);
        game.load.image('background', 'assets/wall-1.png (1).png');
        game.load.image('door', 'assets/door.png');
        game.load.spritesheet('key', 'assets/key.png', 64, 64);
    },

    create: function() {
        // game.add.sprite(400, 300, 'key');
        
        wallTile = game.add.tileSprite(0, 0, 800, 600, 'background');
        this.door = game.add.sprite(580, -25, 'door');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        

        var ground = this.platforms.create(0, game.world.height - 50, 'platform');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        var ledge = this.platforms.create(500, 450, 'platform');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.75);
        
        var ledge2 = this.platforms.create(600, 200, 'platform');
        ledge2.body.immovable = true;
        ledge2.scale.setTo(0.75);
        
        var ledge3 = this.platforms.create(-300, 325, 'platform');
        ledge3.body.immovable = true;
        ledge3.scale.setTo(0.75);
        
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.player = game.add.sprite(32, game.world.height - 300, 'girl');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 500;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2], 10, true);
        this.player.animations.add('right', [3, 4, 5], 10, true);
        this.player.animations.add('still', [6, 7, 8], 10, true);
        
        this.player.body.setSize(95, 164, 50, 20);
        
        this.cursors = game.input.keyboard.createCursorKeys();
    
        this.key1 = game.add.sprite(600, 380, 'key');
        game.physics.arcade.enable([this.player, this.key1]);
        this.key1.enableBody = true;
        this.key1.animations.add('bounce', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        
        this.player.body.onCollide = game.state.start('level 2');
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.key, this.platforms);
        game.physics.arcade.collide(this.key, this.player);
        
        this.key1.animations.play('bounce');
        
        this.player.body.velocity.x = 0;
        
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -300;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 300;
            this.player.animations.play('right');
        }
        else {
            this.player.animations.play('still');
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -400;
        }
        
        // wallTile.tilePosition.x -= this.player.body.velocity.x / 50;
        // if(this.cursors.down.isDown) {
        //     game.state.start('level2');
        // }
    },
}
game.state.add('main', game_state.main);
game.state.start('main');
