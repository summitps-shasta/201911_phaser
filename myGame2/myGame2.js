/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/New Piskel (14).png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/New Piskel (12).png', 84, 76);
        this.score = 0;
        this.scoreText;
        alert('Get a score of 12, if you fall off then reload the game')
        

    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0, 'sky');
        game.add.sprite(0,0, 'star');
        this.platforms = game.add.group();
        this.platforms.enableBody  = true;
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        var ledge1 = this.platforms.create(350,200, 'ground');
        ledge1.body.immovable = true;
        var ledge2 = this.platforms.create(110,300, 'ground');
        ledge2.body.immovable = true;
        var ledge3 = this.platforms.create(40,450, 'ground');
        ledge3.body.immovable = true;
        var ledge4 = this.platforms.create(50,100, 'ground');
        ledge4.body.immovable = true;
        var ledge5 = this.platforms.create(80, 150, 'ground');
        ledge5.body.immovable = true;
        var ledge6 = this.platforms.create(500,100, 'ground');
        ledge6.body.immovable = true;
        var ledge7 = this.platforms.create(300,110, 'ground');
        ledge7.body.immovable = true;
        var ledge8 = this.platforms.create(200, 80, 'ground');
        ledge8.body.immovable = true;
        var ledge9 = this.platforms.create(450,200, 'ground');
        ledge9.body.immovable = true;
        var ledge10 = this.platforms.create(600,300, 'ground');
        ledge10.body.immovable = true;
        var ledge11 = this.platforms.create(145,300, 'ground');
        ledge11.body.immovable = true;
        var ledge12 = this.platforms.create(400,450, 'ground');
        ledge12.body.immovable = true;
        var ledge13 = this.platforms.create(60,550, 'ground');
        ledge13.body.immovable = true
        var ledge14 = this.platforms.create(150,350, 'ground');
        ledge14.body.immovable = true;
         var ledge15 = this.platforms.create(690, 500, 'ground');
        ledge15.body.immovable = true;
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.3;
        this.player.body.gravity.y = 70;
        this.player.scale.setTo(0.5, 0.5);
        this.player.body.collideWORLDBOUNDS = true;
        this.player.animations.add('left', [2, 1,], 10, true);
        this.player.animations.add('right',[3, 4,], 10, true);
        game.physics.arcade.collide(this.player, this.platforms);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var star = this.stars.create(i * 70,0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
            
             }
        this.scoreText = game.add.text(16, 16, 'score:0', {
            fontSize: '32px',
            fill:'#000'
        })
        
    }, 
        



    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        this.player.body.velocity.x = 0
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
            this.player.frame = 0;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -150;
        }
        game.physics.arcade.collide(this.stars, this.platforms);
            
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        
    },
    collectStar: function(dude, star){
        star.kill();
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
    }
        
    
    


}
game.state.add('main', game_state.main);
game.state.start('main');
      
