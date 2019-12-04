/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png')
        game.load.image('ground', 'assets/platform.png')
        game.load.image('star', 'assets/star.png')
        game.load.spritesheet('player', 'assets/player.png', 160, 160);
        game.load.image('object', 'assets/object.png');
    
    },

    create: function() {
        // Set the background color to blue
        game.stage.backgroundColor = '#ffff00';
        game.add.sprite(0,0, 'star');
        // A simple background for our game
        game.add.sprite(0, 0, 'sky');
        // The platforms gorup contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();
        // We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;
        // Here we create the ground.
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        // Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);
        // This stops it from falling away when you jump on it
        ground.body.immovable = true;
        // Now let's create two ledges
        var ledge = this.platforms.create(180, 180, 'ground');
        ledge.body.immovable = true;
        // We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // The this.player and its settings
        this.player = game.add.sprite(32, - 150, 'player');
        // We need to enable physics on the this.player
        game.physics.arcade.enable(this.player);
        // Player physics properties. Give the little guy a slight bounce. 
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.body.collideWorldBound = true;
        // Our controls.
        this.cursors = game.input.keyboard.createCursorKeys();
        // Start the arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Add the player at the bottom of the screen
        this.player = game.add.sprite(200, 400, 'player');
        // We need to enable physics on this.player
        game.physics.arcade.enable(this.player);
        // Enable body on player
        this.player.enableBody = true;
        // Make sure the player won't move when it hits the ball
        this.player.body.immovable = true;
        // Create the left/right arrow keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        // Create objects group
        this.objects = game.add.group();
        // Enable body for all objects in the group
        this.objects.enableBody = true;
        // Anchor this object to _this variable 
        var _this = this;
        // Create objects over time
        setInterval(function() {
            // create an object at the top of the screen at a random x
            var object = _this.objects.create(Math.random() * 800, -64, 'object');
            // Let gravity do its thing
            object.body.gravity.y = 300;
        }, 1000) // 1000 = 1000ms = 1 second

        // Our two animations, walking left and right.
        this.player.animations.add('left', [4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [0, 1, 2, 3,], 10, true);
    },

    update: function() {
        // Move the player left/right when an arrow key is pressed
        if (this.left.isDown) {
            this.player.body.velocity.x = -300;
            this.player.animations.play('left');
        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 300;
            this.player.animations.play('right');
            
        }
        // Stop the player when no key is pressed
        else {
            this.player.body.velocity.x = 0;
        }
        // Collision between the player and object
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);


    },


    hitObject: function(player, object) {
        object.kill();
    }
};
game.state.add('main', game_state.main);
game.state.start('main');