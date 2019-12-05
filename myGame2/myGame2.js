/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/player.png', 160, 160);
    },

    create: function() {
      // We're going to be using physics, so enable the Arcade Physics system
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.add.sprite(0, 0, 'star');
      // A simple background for our game
      game.add.sprite(0, 0, 'sky');
      // The platforms group contains the ground and the 2 ledges we can jump on
      this.platforms = game.add.group();
      // We will enable physics for any object that is created in this group
      this.platforms.enableBody = true;
      // Here we create the ground.
      var ground = this.platforms.create(0, game.world.height - 64, 'ground');
      // Scale it to fit the width of the game (the original sprite is 400x32 in size
      ground.scale.setTo(2, 2);
      // This stops it from falling away when you jump on it
      ground.body.immovable = true;
      // Now let's create two ledges
      var ledge = this.platforms.create(120, 75, 'ground');
      ledge.body.immovable = true;
      // The this.player and its settings
      this.player = game.add.sprite(32, game.world.height - 200, 'dude');
      // We need to enable physics on the this.player
      game.physics.arcade.enable(this.player);
      // Player physics properties. Give the little guy a slight bounce.
      this.player.animations.add('right', [0, 1, 2, 3], 10, true);
      this.player.animations.add('left', [5, 6, 7, 8], 10, true);

      // Finally some this.stars to collect
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

      this.cursors = game.input.keyboard.createCursorKeys();
      // Reset the this.players velocity (movement)
      this.player.body.veloctiy.x = 0;
    },

    update: function() {
        // Collide the player and the platforms
        game.physics.arcade.collide(this.player, this.platforms);
        // Checks to see if the this.player overlaps with any of the this.stars, if he does call the collectStar function
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        // Our controls.

      if (this.cursors.left.isDown) {
          // Move to the left
          this.player.body.velocity.x = -150;
          this.player.animations.play('left');
          
      }
      else if (this.cursors.right.isDown) {
          // Move to the right
          this.player.body.velocity.x = 150;
          this.player.animations.play('right');
                }
      else {
          // Stand still
          this.player.animations.stop();
          this.player.frame = 4;
      }
      // Allow the this.player to jump if they are touching the ground.
      if (this.cursors.up.isDown && this.player.body.touching.down) {
          this.player.body.velocity.y = -350
      }
    },
    
    collectStar: function(player,star) {
        // Removes the star from the screen
        star.kill();

    }

}

game.state.add('main', game_state.main);
game.state.start('main');

