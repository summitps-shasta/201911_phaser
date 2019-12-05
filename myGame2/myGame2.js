/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('player', 'assets/medii.png', 128, 128);
        game.load.image('object', 'assets/wtalis.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'star');
        game.add.sprite(0, 0, 'sky');

        // The platforms group contains the ground and the 2 ledges we can jum pon
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        // Now let's create two ledges
        var ledge = this.platforms.create(400, 385, 'ground');
        ledge.body.immovable = true;
        // Start the arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the player at the bottom of the screen
        this.player = game.add.sprite(200, 412, 'player');
        // Our two animations, walking left and right.
        this.player.animations.add('left', [3, 4], 10, true);
        this.player.animations.add('right', [1, 2], 10, true);
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        // Player physics properties. Give the little guy a slight bounce.
//        this.player.body.bounce.y = 0;
//        this.player.body.gravity.y = 275;
//        this.player.body.collideWorldBounds = true;
        // Make sure the player won't move when it hits the ball
        this.player.body.immovable = true;

        // Create the left/right arrow keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);

        // Create objects group
        this.objects = game.add.group();
        // Enable body for all objects in the group
        this.objects.enableBody = true;
        // Anchor this object to _this variable 
        var _this = this;
        // Create objects over time
        // setInterval(function() {
        //     // create an object at the top of the screen at a random x
        //     var object = _this.objects.create(Math.random() * 800, -64, 'object');
        //     // Let gravity do its thing
        //     object.body.gravity.y = 300;
        // }, 1000); // 1000 = 1000ms = 1 second

        // Finally some this.star to collect
        this.stars = game.add.group();
        // We will enable physics for any star that is created in this group
        this.stars.enableBody = true;
        // Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++) {
            // Create a star inside of the 'this.stars' group
            var star = this.stars.create(i * 70, 0, 'star');
            // Let gravity do its thing
            star.body.gravity.y = 300;
            // This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        // The this.score
        this.scoreText - game.add.text(16, 16, 'score:0', {
            fontSize: '32px',
            fill: '#000'
        });
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
            this.player.frame = 0;
        }
        if (this.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
        // Collide the player and the platforms
        game.physics.arcade.collide(this.player, this.platforms);

        // Collision between the player and object
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
    },

    hitObject: function(player, object) {
        object.kill();

        // Collide the stars and the platforms
        game.physics.arcade.collide(this.stars, this.platforms);

        // Checks to see if this this.player overlaps with any of the this.starrs, if he does call the collectStar function
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
    },

    collectStar: function(player, star) {
        //Removes the star from the screen
        star.kill();
    }
};
game.state.add('main', game_state.main);
// game.state.start('main');
