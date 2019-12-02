/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

        preload: function() {
            game.load.image('player', 'assets/player.png');
            game.load.image('object', 'assets/object.png');

        },

        create: function() {

                // set background blue
                game.stage.backgroundColor = '#3598db';

                // start arcade physics system (for movements and collision)
                game.physics.startSystem(Phaser.Physics.ARCADE);

                // add player to bottom of screen
                this.player = game.add.sprite(200, 400, 'player');

                // enable physics on this control
                game.physics.arcade.enable(this.player);

                // enable body on player
                this.player.enableBody = true;

                // make sure the player wont move when it hits the ball
                this.player.body.immovable = true;

                // create the left/right arrow keys
                this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
                this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

                // create objects group
                this.objects = game.add.group();

                // enable body for all objects in the group
                this.objects.enableBody = true;

                // anchor this object to _this variable
                var _this = this;

                // creates objects over time
                setInterval(function()
                    // create an object at the top of the screen at a random x
                    {var object = _this.objects.create(Math.random() * 800, -64, 'object');

                    // Gravity
                    object.body.gravity.y = 300;

                }, 1000); // 1000 = 1000 ms = 1 second
        },


                update: function() {

                    // move player left/right when an arrow key is pressed
                    if (this.left.isDown) {
                        this.player.body.velocity.x = -300;
                    }

                    else if (this.right.isDown) {
                        this.player.body.velocity.x = 300;

                    }
                    // stop the player when no key is pressed
                    else {
                        this.player.body.velocity.x = 0;
                    }


                    // collision between the player and object
                    game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
                },

                    hitObject: function(player, object) {
                        object.kill();
                    }
                };


                game.state.add('main', game_state.main);
                game.state.start('main');
