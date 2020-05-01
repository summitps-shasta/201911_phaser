/*global Phaser*/
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },

}

var game = new Phaser.Game(config);

game.globalVars = {
    
};
var game_state = {
    first: function() {}
};

game_state.first.prototype = {

    preload: function() {
        game.load.image('star', 'assets/star.png');
        game.load.image('room1','assets/room1.png');
        game.load.image('strip','assets/strip.png');
        game.load.spritesheet('player','assets/prot.png',96,216);
        game.load.spritesheet('flame','assets/flame.png', 800,600);
        game.load.image('northtower','assets/northtower.png',800,600);
        game.load.image('stripr','assets/stripr.png');
        game.load.image('sky','assets/thesky.png');
        game.load.image('window','assets/window.png');
        game.load.image('table','assets/table.png');
        game.load.image('macintosh','assets/macintosh.png');
        game.load.spritesheet('door','assets/door.png',100,288);
    },

    create: function() {
        game.add.sprite(0,0,'sky');
        this.northtower = game.add.sprite(500,0,'northtower');
        game.physics.arcade.enable(this.northtower);        
        this.burnl = [];
        for(var i = 0; i <= 180; i += 1){
            this.burnl.push(i);
        }
        this.fire = game.add.sprite(75,-250,'flame');
        this.fire.scale.setTo(1.2,1.2);
        this.fire.animations.add('burning', this.burnl, 24, true);
        this.fire.animations.play('burning');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,'room1');
        this.window = game.add.sprite(0,0,'window');
        this.window.alpha = 0.25;
        game.add.sprite(400,375,'table');
        game.add.sprite(32,375,'table');
        this.macintosh =game.add.sprite(460,360,'macintosh');
        this.macintosh2=game.add.sprite(87,360,'macintosh');
        this.macintosh.scale.setTo(0.5,0.5);
        this.macintosh2.scale.setTo(0.5,0.5);
        this.player = game.add.sprite(32, 350,'player');
        game.physics.arcade.enable(this.player);
        //this.player.scale.setTo(2,2);
        this.player.enableBody = true;
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 2000;
        this.player.body.collideWorldBounds = true;
        this.cursors = game.input.keyboard.createCursorKeys();
        this.player.animations.add('left', [1, 2], 10, true);
        this.player.animations.add('right', [4, 5], 10, true);
        this.player.animations.add('idleright', [3], 10,true);
        this.player.animations.add('idleleft', [0],10,true);
        // this.player.animations.add('jumpleft', [7,3],0.25,true);
        // this.player.animations.add('jumpright', [6,0],0.25,true);
        this.strip = game.add.sprite(0,599,'strip');
        game.physics.arcade.enable(this.strip);
        this.strip.enableBody=true;
        this.strip.body.immovable =true;
        this.northtower.enableBody = true;
        this.stripr = game.add.sprite(799,0,'stripr');
        game.physics.arcade.enable(this.stripr);
        this.stripr.enableBody=true;
        this.stripr.body.immovable =true;
        this.stripl = game.add.sprite(0,0,'stripr');
        game.physics.arcade.enable(this.stripl);
        this.stripl.enableBody=true;
        this.stripl.body.immovable =true;
        game.physics.arcade.enable(this.fire); 
        this.fire.enableBody = true;
        this.door = game.add.sprite(699,350,'door');
        game.physics.arcade.enable(this.door);
        this.door.enableBody = true;
        this.door.body.immovable = true;
        this.door.animations.add('open', [0,1,2,3,4,5],10,true);
        //this.door.animations.add('opened',[6],10,true);
        this.door.animations.play('open');
        //this.door.scale.setTo(10,10);
        
        
    },

    update: function() {
        game.physics.arcade.overlap(this.player, this.door, this.leave, null, this);
        game.physics.arcade.collide(this.strip, this.player);
        game.physics.arcade.collide(this.stripr, this.player);
        game.physics.arcade.collide(this.stripl, this.player);
        //game.physics.arcade.collide(this.door, this.player);
        this.player.body.velocity.x = 0;
        this.northtower.body.velocity.x=0;
        this.fire.body.velocity.x=0;
        // if(this.player.body.touching.down == false){
        //     this.player.animations.stop;
        // }
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -300;
            if(this.player.body.touching.down == true){
                this.player.body.velocity.x -= 200;
            }
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 300;
            if(this.player.body.touching.down == true){
                this.player.body.velocity.x += 200;
            }
            //this.stone.body.velocity.x = 150;
        }
        else {
            this.player.animations.stop();
            if(this.playerdirection==0){
                this.player.animations.play('idleright');
            }
            else if(this.playerdirection==1){
                this.player.animations.play('idleleft');
            }
        }
        if(this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -750;
            // if(this.playerdirection == 1){
            //     this.player.animations.stop;
            //     this.player.animations.play('jumpright');
            // }
        }
        if(this.cursors.down.isDown){
            this.player.body.velocity.y = 750;
            //game.state.start('second');
        }
        if(this.cursors.left.isDown && this.player.body.touching.down) {
            this.player.animations.play('right');
            this.playerdirection=0;
        }
        if(this.cursors.right.isDown && this.player.body.touching.down) {
            this.player.animations.play('left');
            this.playerdirection=1;
        }
        if(this.player.body.touching.down == false){
            this.player.animations.stop();
        }
        if(this.player.body.touching.right ==false && this.cursors.right.isDown){
            this.northtower.body.velocity.x = -40;
            this.fire.body.velocity.x = -40;
        }
        if(this.player.body.touching.left ==false && this.cursors.left.isDown){
            this.northtower.body.velocity.x = 40;
            this.fire.body.velocity.x = 40;
        }
    },
    leave: function(){
        game.state.start('second');
        
    }, 

};
game.state.add('first', game_state.first);
