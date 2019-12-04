/*global Phaser*/

var game = new Phaser.Game(1300, 731, Phaser.AUTO, '');
var game_state = {} ;

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/newsky.png');
        game.load.image('backwall', 'assets/backwall2.png');
        game.load.spritesheet('Real', 'assets/Realhero.png', 21, 27);
        game.load.spritesheet('lava', 'assets/lava2.png', 64, 32);
        game.load.image('star', 'assets/Pebble.png');
        game.load.image('ground', 'assets/grasslol3-1.png.png');
        game.load.image('floor', 'assets/bfloor.png');
        game.load.image('floor2', 'assets/bfloor2.png');
        game.load.image('wall2', 'assets/Walldoor.png');
        game.load.spritesheet('door', 'assets/doof.png', 32, 48);
        game.load.image('wall', 'assets/Wall.png');
        this.red = 'active';
        this.score = 0;
        this.scoreText;
    },

    create: function() {
        game.stage.backgroundColor = '#3598db';
        
        game.add.sprite(0, 0, 'sky');
        game.add.sprite(300, 65, 'backwall');
        game.add.sprite(0, 0, 'star');
        game.physics.startSystem(Phaser.Physics.ARCADE);
         this.platforms = game.add.group();
         this.platforms.enableBody = true;
         this.walls = game.add.group();
         this.walls.enableBody = true;
         var ground = this.platforms.create(0, game.world.height - 64, 'ground');
         ground.scale.setTo(3.3, 2);
         ground.body.immovable = true;
          
     
         
         var wall = this.walls.create(300, 65, 'wall');
         wall.scale.setTo(0.5, 0.83);
         wall.body.immovable = true;
         
         var walld1 = this.walls.create(792, 481.33333, 'wall2');
         walld1.body.immovable = true;
         var walld2 = this.walls.create(792, 281.666666, 'wall2');
         walld2.body.immovable = true;
         //var walld3 = this.walls.create(792, 81, 'wall2');
         //walld3.body.immovable = true;
         
         var ledge1 = this.platforms.create(300, 667, 'floor');
         ledge1.scale.setTo(1.06837, 2);
         var ledge2 = this.platforms.create(315, 466.33333, 'floor');
         ledge2.scale.setTo(1, 0.5);
         ledge1.body.immovable = true;
         ledge2.body.immovable = true;
         
         var ledge3 = this.platforms.create(348, 265.66666, 'floor');
         ledge3.scale.setTo(1, 0.5);
         ledge3.body.immovable = true;
         
         var ledge4 = this.platforms.create(380, 65, 'floor');
         ledge4.scale.setTo(1, 0.5);
         ledge4.body.immovable = true;
         
         var ledge5 = this.platforms.create(315, 65, 'floor');
         ledge5.scale.setTo(0.034188, 0.5);
         ledge5.body.immovable = true;
         
         var wallex1 = this.walls.create(game.world.width - 15, 0, 'wall');
         wallex1.scale.setTo(0.5, 1);
         wallex1.body.immovable = true;
         
         this.lava = game.add.sprite(300, 667, 'lava');
         this.lava.scale.setTo(2, 2);
         this.lava.enableBody = true;
         this.lava.animations.add('boil', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 
         12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 
         30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], 24, true);
        this.player = game.add.sprite(32, game.world.height - 150, 'Real');
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        //this.player.body.immovable = true;
        this.player.body.gravity.y = 200;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23], 14, true);
        this.player.animations.add('right', [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ,22], 14, true);
        //this.player.animations.add('faceright', [24, 25, 26, 27], 7, true);
      //  this.player.animations.add('faceleft', [28, 29, 30, 31], 7, true);
       
        
        this.cursors = game.input.keyboard.createCursorKeys();
        this.stars = game.add.group();
        this.stars.enableBody = true;
      //  var _this = this;
        for (var i = 0; i < 12; i++) {
            var star = this.stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 500;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        //setInterval(function () {var object = _this.objects.create(Math.random() * 800, -64, 'object');
        //object.body.gravity.y = 300;
        //}, 900); // 1000 = 100ms = 1 second
        this.scoreText = game.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#00fbff'});
    },
    
    update: function() {
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            
            this.player.animations.play('left');
            this.direction = -1;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            
            this.player.animations.play('right');
            this.direction = 1;
        }
        else {
            this.player.animations.stop();
            if (this.direction == 1) {
                this.player.frame = 24}
            else if (this.direction == -1) {
                this.player.frame = 28}
        }
        
        game.physics.arcade.collide(this.player, this.platforms);
    //    game.physics.arcade.overlap(this.player, this.door, this.openUp, null, this);
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.stars, this.platforms);
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        if (this.red == 'active') {
            this.lava.animations.play('boil');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down || this.cursors.down.isDown
        ) {
            this.player.body.velocity.y = -150;
        }
    },
    
    //openUp: function(player, door) {
    //    this.door.frame = 1;
//    },
    
    collectStar: function(player, star) {
        star.kill();
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
    },
}; //1236

game.state.add('main', game_state.main);
game.state.start('main');