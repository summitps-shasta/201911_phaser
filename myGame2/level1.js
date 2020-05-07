/*  global this, game, game_state, Phaser  */

game_state.second = function() {};

game_state.second.prototype = {
    preload: function() {
        game.load.spritesheet('player','assets/prot.png',96,216);
        game.load.spritesheet('door','assets/door.png',38,288);
        game.load.image('rim','assets/room2floor.png');
        game.load.image('wall','assets/room2wall.png');
        game.load.spritesheet('room2','assets/room2.png',800,600);
        game.load.spritesheet('tentacles','assets/tentacles.png',33,99);
        game.load.audio('augh', 'assets/augh.mp3');
        game.load.image('damage', 'assets/damrim.png');
        game.load.audio('crack','assets/crack.mp3');
        game.load.audio('shock','assets/shock.mp3');
    },

    create: function() {
        this.augh = game.add.audio('augh');
        this.crack= game.add.audio('crack');
        this.shock=game.add.audio('shock');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.room2=game.add.sprite(0,0,'room2');
        this.room2.animations.add('flikr', [1,0,1,0],6,false);
        this.player = game.add.sprite(32, 0,'player');
        game.physics.arcade.enable(this.player);
        this.player.scale.setTo(0.75,0.75);
        this.player.enableBody = true;
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 2000;
        this.cursors = game.input.keyboard.createCursorKeys();
        this.player.animations.add('left', [1, 2], 10, true);
        this.player.animations.add('right', [4, 5], 10, true);
        this.player.animations.add('idleright', [3], 10,true);
        this.player.animations.add('idleleft', [0],10,true);
        this.rim = game.add.sprite(0, 490,'rim');
        game.physics.arcade.enable(this.rim);
        this.rim.enableBody=true;
        this.rim.body.immovable =true;
        this.wall = game.add.sprite(0, 120,'wall');
        game.physics.arcade.enable(this.wall);
        this.wall.enableBody=true;
        this.wall.body.immovable =true;
        this.wall2 = game.add.sprite(790, 120,'wall');
        game.physics.arcade.enable(this.wall2);
        this.wall2.enableBody=true;
        this.wall2.body.immovable =true;
        
        
        this.door = game.add.sprite(770,315,'door');
        game.physics.arcade.enable(this.door);
        this.door.enableBody = true;
        this.door.body.immovable = true;
        this.door.animations.add('open', [0,1,2,3,4,5],10,true);
        this.door.animations.play('open');
        this.door.scale.setTo(0.6,0.6);
        
        this.tentacles = game.add.sprite(150,342,'tentacles');
        this.tentacles.animations.add('idling',[0,1],6, false);
        this.tentacles.animations.add('strike',[0,1,2],12,false);
        this.tentacles.scale.setTo(1.5,1.5);
        this.chill=0;
        this.striketime=0;
        this.hitnow=0;
        this.safety=0;
        
        
        this.tentacles2 = game.add.sprite(300,342,'tentacles');
        this.tentacles2.animations.add('idling',[0,1],6, false);
        this.tentacles2.animations.add('strike',[0,1,2],12,false);
        this.tentacles2.scale.setTo(1.5,1.5);
        this.chill2=0;
        this.striketime2=0;
        this.hitnow2=0;
        this.safety2=0;
        
        
        this.tentacles3 = game.add.sprite(450,342,'tentacles');
        this.tentacles3.animations.add('idling',[0,1],6, false);
        this.tentacles3.animations.add('strike',[0,1,2],12,false);
        this.tentacles3.scale.setTo(1.5,1.5);
        this.chill3=0;
        this.striketime3=0;
        this.hitnow3=0;
        this.safety3=0;
        
        
        this.tentacles4 = game.add.sprite(600,342,'tentacles');
        this.tentacles4.animations.add('idling',[0,1],6, false);
        this.tentacles4.animations.add('strike',[0,1,2],12,false);
        this.tentacles4.scale.setTo(1.5,1.5);
        this.chill4=0;
        this.striketime4=0;
        this.hitnow4=0;
        this.safety4=0;
        
        this.damrim = game.add.sprite(0,0,'damage');
        this.damrim.alpha = 0;
        
        this.flikrcount = 0;
        
        
        
        
    },

    update: function() {
        game.physics.arcade.overlap(this.player, this.door, this.leave, null, this);
        //game.physics.arcade.overlap(this.player, this.tentacles,this.hitnow = 1, null, this);
        game.physics.arcade.collide(this.player, this.rim);
        game.physics.arcade.collide(this.player,this.wall);
        game.physics.arcade.collide(this.player,this.wall2);
        this.player.body.velocity.x = 0;
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

        }
        if(this.cursors.down.isDown){
            this.player.body.velocity.y = 750;
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
        
        
        if(this.player.world.x>80 && this.player.world.x<145 && game.time.totalElapsedSeconds() - this.striketime >= 0.9){
            this.tentacles.animations.play('strike');
            this.chill=1;
            this.striketime = game.time.totalElapsedSeconds();
            this.crack.play();
        }
        if(game.time.totalElapsedSeconds() - this.striketime >= 0.3){
            this.chill=0;
        }
        if(this.chill==0){
            this.tentacles.animations.play('idling');
        }
        if(game.time.totalElapsedSeconds() - this.striketime >= 0.12 && game.time.totalElapsedSeconds() - this.striketime <= 0.3){
            this.safety = 1;
        }
        else{
            this.safety=0;
        }
        if(this.player.overlap(this.tentacles) && game.time.totalElapsedSeconds() - this.hitnow >= 1 && this.safety == 1) {
            this.augh.play();
            this.damrim.alpha = 0.75;
            game.add.tween(this.damrim).to( {alpha : 0}, 350, Phaser.Easing.Linear.None, true);
            game.globalVars.damage += 1;
            this.player.alpha = 0.5;
            game.add.tween(this.player).to( {alpha : 1}, 1000, Phaser.Easing.Linear.None, true);
            this.hitnow = game.time.totalElapsedSeconds();
        }
        
        //separator
        
        if(this.player.world.x>230 && this.player.world.x<295 && game.time.totalElapsedSeconds() - this.striketime2 >= 0.9){
            this.tentacles2.animations.play('strike');
            this.chill2=1;
            this.striketime2 = game.time.totalElapsedSeconds();
            this.crack.play();
        }
        if(game.time.totalElapsedSeconds() - this.striketime2 >= 0.3){
            this.chill2=0;
        }
        if(this.chill2==0){
            this.tentacles2.animations.play('idling');
        }
        if(game.time.totalElapsedSeconds() - this.striketime2 >= 0.12 && game.time.totalElapsedSeconds() - this.striketime2 <= 0.3){
            this.safety2 = 1;
        }
        else{
            this.safety2=0;
        }
        if(this.player.overlap(this.tentacles2) && game.time.totalElapsedSeconds() - this.hitnow2 >= 1 && this.safety2 == 1) {
            this.augh.play();
            this.damrim.alpha = 0.75;
            game.add.tween(this.damrim).to( {alpha : 0}, 350, Phaser.Easing.Linear.None, true);
            game.globalVars.damage += 1;
            this.player.alpha = 0.5;
            game.add.tween(this.player).to( {alpha : 1}, 1000, Phaser.Easing.Linear.None, true);
            this.hitnow2 = game.time.totalElapsedSeconds();
        }
        
        //separator
        
        if(this.player.world.x>380 && this.player.world.x<445 && game.time.totalElapsedSeconds() - this.striketime3 >= 0.9){
            this.tentacles3.animations.play('strike');
            this.chill3=1;
            this.striketime3 = game.time.totalElapsedSeconds();
            this.crack.play();
        }
        if(game.time.totalElapsedSeconds() - this.striketime3 >= 0.3){
            this.chill3=0;
        }
        if(this.chill3==0){
            this.tentacles3.animations.play('idling');
        }
        if(game.time.totalElapsedSeconds() - this.striketime3 >= 0.12 && game.time.totalElapsedSeconds() - this.striketime3 <= 0.3){
            this.safety3 = 1;
        }
        else{
            this.safety3=0;
        }
        if(this.player.overlap(this.tentacles3) && game.time.totalElapsedSeconds() - this.hitnow3 >= 1 && this.safety3 == 1) {
            this.augh.play();
            this.damrim.alpha = 0.75;
            game.add.tween(this.damrim).to( {alpha : 0}, 350, Phaser.Easing.Linear.None, true);
            game.globalVars.damage += 1;
            this.player.alpha = 0.5;
            game.add.tween(this.player).to( {alpha : 1}, 1000, Phaser.Easing.Linear.None, true);
            this.hitnow3 = game.time.totalElapsedSeconds();
        }
        
        //separator
        
        if(this.player.world.x>530 && this.player.world.x<595 && game.time.totalElapsedSeconds() - this.striketime4 >= 0.9){
            this.tentacles4.animations.play('strike');
            this.chill4=1;
            this.striketime4 = game.time.totalElapsedSeconds();
            this.crack.play();
        }
        if(game.time.totalElapsedSeconds() - this.striketime4 >= 0.3){
            this.chill4=0;
        }
        if(this.chill4==0){
            this.tentacles4.animations.play('idling');
        }
        if(game.time.totalElapsedSeconds() - this.striketime4 >= 0.12 && game.time.totalElapsedSeconds() - this.striketime4 <= 0.3){
            this.safety4 = 1;
        }
        else{
            this.safety4=0;
        }
        if(this.player.overlap(this.tentacles4) && game.time.totalElapsedSeconds() - this.hitnow4 >= 1 && this.safety4 == 1) {
            this.augh.play();
            this.damrim.alpha = 0.75;
            game.add.tween(this.damrim).to( {alpha : 0}, 350, Phaser.Easing.Linear.None, true);
            game.globalVars.damage += 1;
            this.player.alpha = 0.5;
            game.add.tween(this.player).to( {alpha : 1}, 1000, Phaser.Easing.Linear.None, true);
            this.hitnow4 = game.time.totalElapsedSeconds();
        }
        
        
        game.debug.text('Player:' + this.player.world.x, 32,32);
        game.debug.text('Tentacle:' + this.tentacles.world.x, 32,64);
        game.debug.text('Elapses Seconds ' + game.time.totalElapsedSeconds(),32,96);
        game.debug.text('striketime ' + this.striketime,32,128);
        game.debug.text('cooldown ' + this.chill,32,160);
        game.debug.text('damage ' + game.globalVars.damage,32,192);
        
        if(game.globalVars.damage == 10000){
            game.state.start('dead');
        }
        
        if(game.time.totalElapsedSeconds() - this.flikrcount >= 5){
            this.room2.animations.play('flikr');
            this.shock.play();
            this.flikrcount = game.time.totalElapsedSeconds();
        }
        
    },
    
    
    leave: function(){
        game.state.start('third');
    }, 
    

};

game.state.add('second', game_state.second);