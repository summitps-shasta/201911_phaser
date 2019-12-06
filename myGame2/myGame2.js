/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.spritesheet('player', 'assets/gg.png', 128, 128, 5);
        game.load.image('sky',    'assets/sky.png');       //  SKY  preload
        game.load.image('object',    'assets/Ice.png');       //  SKY  preload
        game.load.image('ground', 'assets/platform.png');  //  PLAT preload
    },

    create: function() {
        
        //Set the background color to blue 
        game.stage.backgroundColor = '#3598db';

        //Start the Arcade physics system(for movements and collisons)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Add the player at the bottom of the screen
        this.player = game.add.sprite(200, 430, 'player');

        //We need to enable physics on the this.player
        game.physics.arcade.enable(this.player);

        //Enable body on player
        this.player.enableBody = true;

        //Make sure the player won't move when it hits the ball
        this.player.body.immovable = true;

        //Create the left/right arrow keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        //Create objects group
        this.objects = game.add.group();

        //Enable body for all objects in the group
        this.objects.enableBody = true;

        //Anchor this object to _this variable
        var _this = this;
        
        this.platforms = game.add.group();  //  PLAT create
    	this.platforms.enableBody = true;   //  PLAT create
    	var ground = this.platforms.create(0, game.world.height - 64, 'ground');  //  PLAT create
    	ground.scale.setTo(2, 2);  //  PLAT create
    	ground.body.immovable = true;  //  PLAT create
    	
    	var ledge1 = this.platforms.create(0, 100, 'ground');  //  PLAT create
    	ledge1.body.immovable = true;  //  PLAT create
    	var ledge2 = this.platforms.create(200, 150, 'ground');  //  PLAT create
    	ledge2.body.immovable = true;  //  PLAT create

        //Create objects over time
        setInterval(function() {
            //create an object at the top of the screen at a random x
            var object = _this.objects.create(Math.random() * 800, -64, 'object');

            //Let gravity do its thing
            object.body.gravity.y = 300;
        }, 1000) // 1000 = 1000ms = 1 second};
        
        //Our two aninmations, walking left and right
        this.player.animations.add('right', [1, 2], 10, true);
        this.player.animations.add('left',  [3, 4], 10, true);

         //The this.score
        this.scoreText = game.add.text(16, 16, 'score: ', {
            fontsize: '32px',
            fill: '#000'
        });
        this.score = 0;
    },

    update: function() {
        //Move the player left/right when an arrow key is pressed
        if (this.left.isDown) {
            this.player.body.velocity.x = -300;
            this.player.animations.play('left');
        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 300;
            this.player.animations.play('right');
        }
        //Stop the player when no key is pressed
        else {
            this.player.body.velocity.x = 0;
            this.player.frame = 0;
        }
        //Collision between the player and the object
        game.physics.arcade.overlap(this.player,this.objects,this.hitObject,null,this);
        
    },
      hitObject: function(player, object) {
        this.score++;
        this.scoreText.text = "score: " + this.score;
        object.kill();
    }
    
    

  
    };

game.state.add('main', game_state.main);
game.state.start('main');
