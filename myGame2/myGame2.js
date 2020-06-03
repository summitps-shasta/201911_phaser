/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.spritesheet('player', 'assets/bbball.png', 128, 128);
        //      game.load.image('player', 'assets/player.png');
        game.load.image('object', 'assets/object.png');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assest/platform.png');
        game.load.image('star', 'assets/star.png');

    },

    create: function() {

        // Set the background color to blue 
        game.stage.backgroundColor = '#3598db';

        // Start the Arcade physics system (for movements and collisons)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the player at the bottom of the screen 
        this.player = game.add.sprite(200, 400, 'player');

        // We need to enable physics on the this.player
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
        
        // We're going to be using physics, so enable the Arcade Physics system 
        game.physics.startsSystem(Phaser.Physics.ARCADE);
        

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
        }, 1000) // 1000 = 100ms = 1 second

        // Our two animations walking left and right.
        this.player.animations.add('left', [2, 3], 10, true);
        this.player.animations.add('right', [0, 1], 10, true);
        
        game.add.sprite(0,0, 'star');
        
        // A simple background for game 
        game.add.sprite(0,0, 'sky');
        
        // The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms=game.add.group();
        // We will enable physics for any object that is created in this group 
        this.platforms.enableBody = true;
        
        // Here we create the ground.
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        
        // Scale it to fit the width of the game (the original sprote is 400x32 in size)
        ground.scale .setTo(2,2);
        
        // This stops it from falling away when yu jump on it 
        ground.body.immovable = true;
        
        // Now let's create two ledges 
        // var ledge = this.platforms.create(50, 30, 'ground');
        // ledge.body.immovable = true
        
        
        

      

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
            this.player.animations.stop();
            this.player.frame = 0
        }

        // Collision between the player and the object
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);

    },
    hitObject: function(player, object) {
        object.kill();
    }

    // game.debug.body(this.player);
};
game.state.add('main', game_state.main);
game.state.start('main');
