/*global Phaser game*/

var game_state = {}
var wallTile

game_state.level3 = function() {};
game_state.level3.prototype = {

    preload: function() {
        game.load.image('background', 'assets/sky.png')
        game.load.image('platform', 'assets/cloud.png');
        game.load.spritesheet('girl', 'assets/cc sprite (1).png', 200, 200);
        game.load.image('key', 'assets/sign.png');
        game.load.image('spike', 'assets/spike.png');
    },
    
    create: function() {

        console.log("start");
        
        wallTile = game.add.tileSprite(0, 0, 800, 600, 'background');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        

        var ground = this.platforms.create(0, game.world.height - 50, 'platform');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        var ledge = this.platforms.create(500, 450, 'platform');
        ledge.body.immovable = true;
        // ledge.scale.setTo(0.75);
        
        var ledge2 = this.platforms.create(300, 265, 'platform');
        ledge2.body.immovable = true;
        // ledge2.scale.setTo(0.75);
        
        var ledge3 = this.platforms.create(-200, 175, 'platform');
        ledge3.body.immovable = true;
        // ledge3.scale.setTo(0.75);
        

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.player = game.add.sprite(32, -50, 'girl');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 500;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2], 10, true);
        this.player.animations.add('right', [3, 4, 5], 10, true);
        this.player.animations.add('still', [6, 7, 8], 10, true);
        
        this.player.body.setSize(95, 164, 50, 20);
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.spike = game.add.sprite(400, 220, 'spike');
        game.physics.arcade.enable(this.spike);
        this.spike.enableBody = true;
        this.spike.body.immovable = true;
        
        this.obstacle = game.add.sprite(400, 505, 'spike');
        game.physics.arcade.enable(this.obstacle);
        this.obstacle.enableBody = true;
        this.obstacle.body.immovable = true;
        
        this.key = game.add.sprite(700, 355, 'key');
        game.physics.arcade.enable(this.key);
        this.key.enableBody = true;
        this.key.body.immovable = true;
        // this.key.animations.add('bounce', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        
        this.spike.body.onCollide = new Phaser.Signal();
        this.spike.body.onCollide.add(this.reset, this);
        this.obstacle.body.onCollide = new Phaser.Signal();
        this.obstacle.body.onCollide.add(this.reset, this);
        this.key.body.onCollide = new Phaser.Signal();
        this.key.body.onCollide.add(this.collide, this);
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.key);
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.player, this.spike);
        game.physics.arcade.collide(this.player, this.obstacle);

        // this.key.animations.play('bounce');
        
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

    reset: function() {
        game.state.start('level3');
    },
    
    collide: function() {
        game.state.start('end');
    },
};

game.state.add('level3', game_state.level3);