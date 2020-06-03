/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

       preload: function() {
        game.load.image('download', 'assets/download.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('acorn', 'assets/acorn.png');
        game.load.spritesheet('some', 'assets/some.png', 130, 130);
    },

    create: function() {
        game.add.sprite(5, 5, 'acorn');
    
        //A simple background for our game
        game.add.sprite(0, 0, 'download');
        
        //The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();

        //We will enable physics for any object that is creat4ed in this group
        this.platforms.enableBody = true;
        
        //Here we create the ground
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        
        //Scale it to fit the width of the game (the original sprite is 288x288 in size)
        ground.scale.setTo(2, 2);
        
        //This stops it from falling away when you jump on it
        ground.body.immovable = true;
        
        //Now let's create ledges
        var ledge1 = this.platforms.create(600, 400, 'ground');
        ledge1.body.immovable = true;
        ledge1.scale.setTo(0.75);
        var ledge2 = this.platforms.create(-70, 350, 'ground');
        ledge2.body.immovable = true;
        ledge2.scale.setTo(0.75);
        var ledge3 = this.platforms.create(200, 200, 'ground');
        ledge3.body.immovable = true;
        ledge3.scale.setTo(0.75);

        
        //We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //The this.player and its settings
        this.player = game.add.sprite(32, game.world.height - 200, 'some');
        
        //We need to enable physics on this.player
        game.physics.arcade.enable(this.player);
        
        //Player physics properties. Give the little guy a bounce.
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 150;
        this.player.body.collideWorldBounds = true;
        
        //Our controls
        this.cursors = game.input.keyboard.createCursorKeys();
        
        //Finally some this.stars to collect
        this.acorns = game.add.group();
        
        //We will enable physics for any star that is created in this group
        this.acorns.enableBody = true;
        
        //Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 14; i++) {
            //Create a star inside of the this.stars' group
            var acorn = this.acorns.create(i * 70, 0, 'acorn');
            
            //Let gravity do its thing
            acorn.body.gravity.y = 300;
            
            //This just gives each star a slightly random bounce value
            acorn.body.bounce.y = 0.7 + Math.random() * 0.2;
            
            //The this.score
            this.scoreText = game.add.text(16, 16, "score: ", {
                fontSize: '32px',
                fill: '#000'
            });
            this.score = 0;
        }
    },
    
    update: function() {
        //Collide the player and the platforms
         game.physics.arcade.collide(this.player, this.platforms);
        
        //Collide the stars and the platforms
        game.physics.arcade.collide(this.acorns, this.platforms);
        
        //Reset the this.players velocity (movement)
        this.player.body.velocity.x = 0;
        
        if (this.cursors.left.isDown) {
            //Move to the left
            this.player.body.velocity.x = -150;
            
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            //Move to the right
            this.player.body.velocity.x = 150;
            
            this.player.animations.play('right');
        }
        else {
            //Stand still
            this.player.animations.stop();
            
            this.player.frame = 0;
        }
        
        //Allow the this.player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = - 250;
        
        }
        
        // Checks to see if this.player overlaps with any of the this.stars, if he does call the collectStar function
        game.physics.arcade.overlap(this.player, this.acorns, this.collectAcorn, null, this);
        
    },
    
    collectAcorn: function(player, acorn) {
        //Removes the star from the screen
        acorn.kill();
        this.score += 1;
        
        this.scoreText.text = "score: " + this.score;
        
    }
};

game.state.add('main', game_state.main);
game.state.start('main');