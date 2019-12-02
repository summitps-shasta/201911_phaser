/*  global game, game_state, Phaser  */

game_state.main = function() {};

game_state.main.prototype = {

    preload: function() {
//      game.load.image('player', 'assets/player.png');
        game.load.image('object', 'assets/object.png');
        game.load.spritesheet('player', 'assets/nar 1.png', 128, 128, 5);

        game.load.image('sky',    'assets/sky.png');       //  SKY  preload
        game.load.image('ground', 'assets/platform.png');  //  PLAT preload
        game.load.image('star',   'assets/star.png');      //  STAR preload
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

//      game.stage.backgroundColor = '#3598db';
        game.add.sprite(0, 0, 'sky');   //  SKY  create
        game.add.sprite(0, 0, 'star');  //  STAR create

        this.player = game.add.sprite(200, 400, 'player');
        this.player.animations.add('right', [1, 3], 10, true);
        this.player.animations.add('left',  [2, 4], 10, true);
//      this.player.scale.setTo(4, 4);
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.immovable = true;

        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.objects = game.add.group();
        this.objects.enableBody = true;
        var _this = this;
        setInterval(function() {
            var object =
              _this.objects.create(
              Math.random() * 800, -64, 'object');
            object.body.gravity.y = 300;
        }, 1000);

    	this.platforms = game.add.group();  //  PLAT create
    	this.platforms.enableBody = true;   //  PLAT create
    	var ground = this.platforms.create(0, game.world.height - 64, 'ground');  //  PLAT create
    	ground.scale.setTo(2, 2);  //  PLAT create
    	ground.body.immovable = true;  //  PLAT create

    	var ledge1 = this.platforms.create(100, 200, 'ground');  //  PLAT create
    	ledge1.body.immovable = true;  //  PLAT create
    	var ledge2 = this.platforms.create(300, 300, 'ground');  //  PLAT create
    	ledge2.body.immovable = true;  //  PLAT create
    },

    update: function() {
        if (this.left.isDown) {
            this.player.body.velocity.x = -300;
            this.player.animations.play('left');
        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 300;
            this.player.animations.play('right');
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 0;
        }

        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
    },

    hitObject: function(player, object) {
        object.kill();
    }
    
};

game.state.add('main', game_state.main);
