/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {} ;

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground','assets/platform.png');
        game.load.image('star', 'assets/pencil-png-pencil-png-image-2115.png');
        game.load.spritesheet('dude', 'assets/New Piskel (2).png', 50, 81);
        this.score = 0;
        this.scoreText;
        game.load.image('ground1','assets/platform.1.png');
        game.load.image('ground2','assets/platform.2.png');
        game.load.image('ground3','assets/platform.3.png');
        game.load.image('ground4','assets/platform.4.png');
        alert("Your goal is to get a score of 10, if you end up dying reload the game")
     

    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');
        game.add.sprite(0, 0, 'star');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
         var ground1 = this.platforms.create(0, game.world.height - 64, 'ground1');
        ground1.scale.setTo(2, 2);
       
        var ground2 = this.platforms.create(0, game.world.height - 64, 'ground2');
        ground2.scale.setTo(2, 2);
        var ground3 = this.platforms.create(0, game.world.height - 64, 'ground1');
        var ground4 = this.platforms.create(0, game.world.height - 64, 'ground');
        ground3.scale.setTo(2,2);
        ground2.scale.setTo(2, 2);
        ground4.scale.setTo(2, 2);
        ground1.body.immovable = true;
        ground2.body.immovable = true;
        ground4.body.immovable = true;
        ground3.body.immovable = true;
       
        var ledge = this.platforms.create(400, 200, 'ground');
        ledge.body.immovable = true;
        var ledge2 = this.platforms.create(50, 375, 'ground');
        ledge2.body.immovable = true;
        var ledge1 = this.platforms.create(0, 300, 'ground');
        ledge1.body.immovable = true;
        var ledge4 = this.platforms.create(0, 175, 'ground');
        ledge4.body.immovable = true;
        var ledge5 = this.platforms.create(-20, 200, 'ground1');
        ledge5.body.immovable = true;
        var ledge6 = this.platforms.create(-20, 0, 'ground1');
        ledge6.body.immovable = true;
         var ledge7 = this.platforms.create(790, 0, 'ground1');
        ledge7.body.immovable = true;
         var ledge8 = this.platforms.create(790, 200, 'ground1');
        ledge8.body.immovable = true;
      
        var ledge9 = this.platforms.create(300, 580, 'ground');
        ledge9.body.immovable = true;
        var ledge10 = this.platforms.create(750, 550, 'ground');
        ledge10.body.immovable = true;
        var ledge11 = this.platforms.create(400, 4, 'ground');
        ledge11.body.immovable = true;
        var ledge12 = this.platforms.create(20, 450, 'ground');
        ledge12.body.immovable = true;
        var ledge13 = this.platforms.create(750, 475, 'ground');
        ledge13.body.immovable = true;
        var ledge14 = this.platforms.create(400, 400, 'ground');
        ledge14.body.immovable = true;
        var ledge15 = this.platforms.create(100, 150, 'ground2');
        ledge15.body.immovable = true;
        var ledge16 = this.platforms.create(50, 245, 'ground');
        ledge16.body.immovable = true;
        var ledge17 = this.platforms.create(500, 50, 'ground2');
        ledge17.body.immovable = true;
        var ledge18 = this.platforms.create(0, 50, 'ground3');
        ledge18.body.immovable = true;
        var ledge19 = this.platforms.create(500, 300, 'ground');
        ledge19.body.immovable = true;
                var ledge27 = this.platforms.create(300, 580, 'ground');
        ledge.body.immovable = true;
            
       
        var ledge21 = this.platforms.create(300, 100, 'ground2');
        ledge21.body.immovable = true;
        var ledge22 = this.platforms.create(500, 200, 'ground');
        ledge22.body.immovable = true;
        var ledge23 = this.platforms.create(500, 50, 'ground');
        ledge23.body.immovable = true;
        var ledge24 = this.platforms.create(675, 125, 'ground');
        ledge24.body.immovable = true;
      
        var ledge25 = this.platforms.create(100, 50, 'ground3');
        ledge25.body.immovable = true;
        var ledge26 = this.platforms.create(650, 230, 'ground');
        ledge26.body.immovable = true;
        var ledge27 = this.platforms.create;
        var ledge28 = this.platforms.create(100, 125, 'ground2');
        ledge28.body.immovable = true;
             
        
        
        this.player = game.add.sprite(50, 450, 'dude');
        this.player.scale.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.gravity.y = 50;
        this.player.body.bounce.y = 0.3;

        this.player.body.collideWorldBounds = false;
        this.player.animations.add('left', [6, 7, 8, 9, ], 10, true);
        this.player.animations.add('right', [0, 1, 2, 3, 4,], 10, true);
        
     
        this.cursors = game.input.keyboard.createCursorKeys();
        this.stars = game.add.group();
        this.stars.enableBody = true;
    
        for (var i = 0; i < 12; i++) {
            var star = this.stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
       

        this.scoreText = game.add.text(16, 16, 'score: 0', {
            fontSize: '32px',
            fill: '#000'});

    },
        
        
        
    

    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
            
        }
        
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        }
        else {
            this.player.animations.stop();
            this.player.frame = 5;
        }
        
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.player, this.ledge27, null, this);

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity. y = -90;
        }
        
        game.physics.arcade.collide(this.stars, this.platforms);


        

    },
    
    collectStar : function(player, star) {
        star.kill();
            this.score += 1;
            this.scoreText.setText('Score: ' + this.score);
    },

};

game.state.add('main', game_state.main);
game.state.start('main');
