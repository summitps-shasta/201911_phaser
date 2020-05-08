/*  global this, game, game_state, Phaser  */

game_state.third = function() {};

game_state.third.prototype = {
    preload: function() {
        game.load.spritesheet('player','assets/prot.png',96,216);
        game.load.spritesheet('door','assets/door.png',38,288);
        game.load.image('rim','assets/room2floor.png');
        game.load.image('wall','assets/room2wall.png');
        game.load.spritesheet('room2','assets/room3.png',800,600);
        game.load.spritesheet('tentacles','assets/tentacles.png',33,99);
        game.load.audio('augh', 'assets/augh.mp3');
        game.load.image('damage', 'assets/damrim.png');
        game.load.spritesheet('shados','assets/shados.png',800,600);
        game.load.audio('shadboss', 'assets/shadboss.mp3');
        game.load.spritesheet('shadtentas','assets/stentas.png', 33,110);
        game.load.audio('crack','assets/crack.mp3');
        game.load.audio('charge','assets/charge.mp3');
        game.load.spritesheet('homing','assets/homing.png',60,400);
        game.load.spritesheet('boost', 'assets/boost.png', 60,200);
        game.load.spritesheet('skull','assets/skull.png',96,216);
    },

    create: function() {
        this.deadyet = 0;
        this.flashable = 0;
        this.crack= game.add.audio('crack');
        this.charge=game.add.audio('charge');
        this.starttime = game.time.totalElapsedSeconds();
        this.laststrike = game.time.totalElapsedSeconds() + 10;
        this.augh = game.add.audio('augh');
        this.shadboss = game.add.audio('shadboss');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.rim = game.add.sprite(0, 390,'rim');
        game.physics.arcade.enable(this.rim);
        this.rim.enableBody=true;
        this.rim.body.immovable =true;
        this.wall = game.add.sprite(0, 20,'wall');
        game.physics.arcade.enable(this.wall);
        this.wall.enableBody=true;
        this.wall.body.immovable =true;
        this.wall2 = game.add.sprite(790, 20,'wall');
        game.physics.arcade.enable(this.wall2);
        this.wall2.enableBody=true;
        this.wall2.body.immovable =true;
        
        this.room2=game.add.sprite(0,0,'room2');
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
        
        
        
        
        // this.door = game.add.sprite(775,235,'door');
        // game.physics.arcade.enable(this.door);
        // this.door.enableBody = true;
        // this.door.body.immovable = true;
        // this.door.animations.add('open', [0,1,2,3,4,5],10,true);
        // this.door.animations.play('open');
        // this.door.scale.setTo(0.5,0.6);
        
        
        this.shadtentas = game.add.sprite(385,400,'shadtentas');
        this.shadtentas.animations.add('appear', [0,1,2,3,4],12, false);
        this.shadtentas.scale.setTo(0.5,2);
        
        this.shadtentas2 = game.add.sprite(235,400,'shadtentas');
        this.shadtentas2.animations.add('appear', [0,1,2,3,4],12, false);
        this.shadtentas2.scale.setTo(0.5,2);
        
        this.shadtentas3 = game.add.sprite(535,400,'shadtentas');
        this.shadtentas3.animations.add('appear', [0,1,2,3,4],12, false);
        this.shadtentas3.scale.setTo(0.5,2);
        
        this.shadtentas4 = game.add.sprite(685,400,'shadtentas');
        this.shadtentas4.animations.add('appear', [0,1,2,3,4],12, false);
        this.shadtentas4.scale.setTo(0.5,2);
        
        this.shadtentas5 = game.add.sprite(85,400,'shadtentas');
        this.shadtentas5.animations.add('appear', [0,1,2,3,4],12, false);
        this.shadtentas5.scale.setTo(0.5,2);
        
        this.bshadt = game.add.sprite(370,407,'shadtentas');
        this.bshadt.animations.add('appear', [0,1,2,3,4],12,false);
        this.bshadt.scale.setTo(1.8,1.9);
        game.physics.arcade.enable(this.bshadt);
        this.bshadt.enableBody = true;
        this.bshadt.body.collideWorldBounds = true;
        //this.bshadt.animations.play('appear');
        
        
        this.boost = game.add.sprite(370,407,'boost');
        this.boost.animations.add('boost', [0,1,2,3,4,5,6,7,8,9,10,11,12,13],20,false);
        this.boost.scale.setTo(1,1);
        game.physics.arcade.enable(this.boost);
        this.boost.enableBody = true;
        this.boost.body.collideWorldBounds = true;
        this.boost.alpha = 0;
        //this.boost.animations.play('boost');
        
        
        
        this.shados = game.add.sprite(0,0, 'shados');
        this.shados.animations.add('awakening', [22,22,22,22,22,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 6, false);
        this.shados.animations.add('flail', [15, 19, 20, 21], 6, false);
        this.shados.animations.add('flash',[15,16,17,18],10,false);
        this.osamalag = game.time.totalElapsedSeconds();
        this.oslayet = 0;
        this.shados.alpha = 0;
        this.anim = 0;
        this.damrim = game.add.sprite(0,0,'damage');
        this.damrim.alpha = 0;
        
        
        this.homingtentacle = game.add.sprite(370,-10,'homing');
        this.homingtentacle.animations.add('home',[0,1,2,3,4,5,6,7,8,9,10],20,false);
        this.homingtentacle.animations.add('withdraw',[10,9,8,7,6,5,4,3,2,1,0],20,false);
        //this.homingtentacle.animations.play('withdraw');
        game.physics.arcade.enable(this.homingtentacle);
        this.bshadt.enableBody = true;
        this.bshadt.body.collideWorldBounds = true;
        
        
        
        this.tentaclesactivate = 0;
        
        
        
        
        this.tentacles = game.add.sprite(68,242,'tentacles');
        this.tentacles.animations.add('idling',[0,1],6, false);
        this.tentacles.animations.add('strike',[0,1,2],12,false);
        this.tentacles.scale.setTo(1.5,1.5);
        this.chill=0;
        this.striketime=0;
        this.hitnow=0;
        this.safety=0;
        this.tentacles.alpha = 0;
        
        this.tentacles2 = game.add.sprite(218,242,'tentacles');
        this.tentacles2.animations.add('idling',[0,1],6, false);
        this.tentacles2.animations.add('strike',[0,1,2],12,false);
        this.tentacles2.scale.setTo(1.5,1.5);
        this.chill2=0;
        this.striketime2=0;
        this.hitnow2=0;
        this.safety2=0;
        this.tentacles2.alpha = 0;
        
        this.tentacles3 = game.add.sprite(368,242,'tentacles');
        this.tentacles3.animations.add('idling',[0,1],6, false);
        this.tentacles3.animations.add('strike',[0,1,2],12,false);
        this.tentacles3.scale.setTo(1.5,1.5);
        this.chill3=0;
        this.striketime3=0;
        this.hitnow3=0;
        this.safety3=0;
        this.tentacles3.alpha = 0;
        
        this.tentacles4 = game.add.sprite(518,242,'tentacles');
        this.tentacles4.animations.add('idling',[0,1],6, false);
        this.tentacles4.animations.add('strike',[0,1,2],12,false);
        this.tentacles4.scale.setTo(1.5,1.5);
        this.chill4=0;
        this.striketime4=0;
        this.hitnow4=0;
        this.safety4=0;
        this.tentacles4.alpha = 0;
        
        this.tentacles5 = game.add.sprite(668,242,'tentacles');
        this.tentacles5.animations.add('idling',[0,1],6, false);
        this.tentacles5.animations.add('strike',[0,1,2],12,false);
        this.tentacles5.scale.setTo(1.5,1.5);
        this.chill5=0;
        this.striketime5=0;
        this.hitnow5=0;
        this.safety5=0;
        this.tentacles5.alpha = 0;
        
        
        this.apyet = 0;
        this.foltime = 1;
        this.tentavelocity = 200;
        this.tentacd = 3;
        this.stoptrigger = 0;
        this.shadstriketime = 0;
        this.hittable = 0;
        
        this.sequence = 0;
        
         
        this.shadboss.play();
        game.input.keyboard.onPressCallback = function(e) {
            console.log("key pressed: ", e);
            if (e == 'i') {
               game.globalVars.damage = -10,000;
               game.debug.text('Invincibility!',32,32);
            }
        };
        
        
        
        
    },

    update: function() {
        //game.physics.arcade.overlap(this.player, this.door, this.leave, null, this);
        //game.physics.arcade.overlap(this.player, this.tentacles,this.hitnow = 1, null, this);
        game.physics.arcade.collide(this.player, this.rim);
        game.physics.arcade.collide(this.player,this.wall);
        game.physics.arcade.collide(this.player,this.wall2);
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -320;
            if(this.player.body.touching.down == true){
                this.player.body.velocity.x -= 220;
            }
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 320;
            if(this.player.body.touching.down == true){
                this.player.body.velocity.x += 220;
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
        
        if(game.time.totalElapsedSeconds() - this.osamalag >= 5 && this.oslayet == 0){
           
            this.shados.alpha = 1;
            
            this.oslayet = 1;
            
            this.shados.animations.play('awakening');
            this.osamalag = game.time.totalElapsedSeconds();
        }
        if(game.time.totalElapsedSeconds() - this.osamalag >= 5 && this.oslayet ==1){
            this.anim =1;
            this.oslayet = 2;
        }
        if(this.anim == 1){
            this.shados.animations.play('flail');
        }
        
        if(game.globalVars.damage == 10 && this.deadyet == 0){
            this.skull = game.add.sprite(this.player.world.x, this.player.world.y,'skull');
            this.player.kill();
            this.deadyet = game.time.totalElapsedSeconds();
            
        }
        if(game.time.totalElapsedSeconds()-this.deadyet >= 1 && this.deadyet != 0){
            game.state.start('dead');
        }
        
        if(game.time.totalElapsedSeconds() - this.starttime >= 183){
            // this.door.alpha = 1;
            // if(this.player.overlap(this.door)){
            //     this.player.kill();
            //     game.state.start('dead');
            // }
            game.state.start('dead');
        }
        //this.door()
        this.powerups()
        this.sequencing()
        this.tentaclesense()
        this.follow()
        this.stopstrike()
        game.debug.text('Damage: ' + game.globalVars.damage,32,64);

        
    },
    
    tentaclesense: function(){
        if(this.tentaclesactivate>=1){
            if(this.player.world.x>-2 && this.player.world.x<63 && game.time.totalElapsedSeconds() - this.striketime >= 0.9){
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
        }
        if(this.tentaclesactivate>=2){
            if(this.player.world.x>148 && this.player.world.x<213 && game.time.totalElapsedSeconds() - this.striketime2 >= 0.9){
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
            if(game.time.totalElapsedSeconds() - this.striketime2 >= 0.12 && game.time.totalElapsedSeconds() - this.striketime2 <= 0.25){
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
        }
        if(this.tentaclesactivate>=3){
            if(this.player.world.x>298 && this.player.world.x<363 && game.time.totalElapsedSeconds() - this.striketime3 >= 0.9){
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
            if(game.time.totalElapsedSeconds() - this.striketime3 >= 0.12 && game.time.totalElapsedSeconds() - this.striketime3 <= 0.25){
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
        }
        if(this.tentaclesactivate>=4){
            if(this.player.world.x>448 && this.player.world.x<513 && game.time.totalElapsedSeconds() - this.striketime4 >= 0.9){
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
            if(game.time.totalElapsedSeconds() - this.striketime4 >= 0.12 && game.time.totalElapsedSeconds() - this.striketime4 <= 0.25){
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
        }
        if(this.tentaclesactivate>=5){
            if(this.player.world.x>598 && this.player.world.x<663 && game.time.totalElapsedSeconds() - this.striketime5 >= 0.9){
                this.tentacles5.animations.play('strike');
                this.chill5=1;
                this.striketime5 = game.time.totalElapsedSeconds();
                this.crack.play();
            }
            if(game.time.totalElapsedSeconds() - this.striketime5 >= 0.3){
                this.chill5=0;
            }
            if(this.chill5==0){
                this.tentacles5.animations.play('idling');
            }
            if(game.time.totalElapsedSeconds() - this.striketime5 >= 0.12 && game.time.totalElapsedSeconds() - this.striketime5 <= 0.25){
                this.safety5 = 1;
            }
            else{
                this.safety5=0;
            }
            if(this.player.overlap(this.tentacles5) && game.time.totalElapsedSeconds() - this.hitnow5 >= 1 && this.safety5 == 1) {
                this.augh.play();
                this.damrim.alpha = 0.75;
                game.add.tween(this.damrim).to( {alpha : 0}, 350, Phaser.Easing.Linear.None, true);
                game.globalVars.damage += 1;
                this.player.alpha = 0.5;
                game.add.tween(this.player).to( {alpha : 1}, 1000, Phaser.Easing.Linear.None, true);
                this.hitnow5 = game.time.totalElapsedSeconds();
            }
        }
    },
    
    sequencing: function(){
        if(this.sequence == 0 && game.time.totalElapsedSeconds() - this.starttime >= 7){
            this.sequence = 1;
            this.shadtentas5.animations.play('appear');
        }
        if(this.sequence ==1 && game.time.totalElapsedSeconds() - this.starttime >=7.5){
            this.tentacles.alpha = 1;
            this.sequence = 2;
            this.tentaclesactivate = 1;
        }
        if(this.sequence == 2 && game.time.totalElapsedSeconds() - this.starttime >= 7.5){
            this.sequence = 3;
            this.shadtentas2.animations.play('appear');
        }
        if(this.sequence ==3 && game.time.totalElapsedSeconds() - this.starttime >=8){
            this.tentacles2.alpha = 1;
            this.sequence = 4;
            this.tentaclesactivate = 2;
        }
        if(this.sequence == 4 && game.time.totalElapsedSeconds() - this.starttime >= 8){
            this.sequence = 5;
            this.shadtentas.animations.play('appear');
        }
        if(this.sequence ==5 && game.time.totalElapsedSeconds() - this.starttime >=8.5){
            this.tentacles3.alpha = 1;
            this.sequence = 6;
            this.tentaclesactivate = 3;
        }
        if(this.sequence == 6 && game.time.totalElapsedSeconds() - this.starttime >= 8.5){
            this.sequence = 7;
            this.shadtentas3.animations.play('appear');
        }
        if(this.sequence ==7 && game.time.totalElapsedSeconds() - this.starttime >=9){
            this.tentacles4.alpha = 1;
            this.sequence = 8;
            this.tentaclesactivate = 4;
        }
        if(this.sequence == 8 && game.time.totalElapsedSeconds() - this.starttime >= 9){
            this.sequence = 9;
            this.shadtentas4.animations.play('appear');
        }
        if(this.sequence ==9 && game.time.totalElapsedSeconds() - this.starttime >=9.5){
            this.tentacles5.alpha = 1;
            this.sequence = 10;
            this.tentaclesactivate = 5;
        }
    },
    
    follow: function(){
        this.bshadt.body.velocity.x=0;
        this.homingtentacle.body.velocity.x = 0;
        this.boost.body.velocity.x=0;
        if(this.apyet == 0 && game.time.totalElapsedSeconds()-this.starttime >= 10){
            this.bshadt.animations.play('appear');
            this.apyet = 1;
            this.foltime = 1;
        }
        if(this.apyet ==1 && this.foltime == 1){
            if(this.player.world.x > this.bshadt.world.x){
                this.bshadt.body.velocity.x = this.tentavelocity;
                this.homingtentacle.body.velocity.x = this.tentavelocity;
                this.boost.body.velocity.x = this.tentavelocity;
            }
            if(this.player.world.x < this.bshadt.world.x){
                this.bshadt.body.velocity.x = 0-this.tentavelocity;
                this.homingtentacle.body.velocity.x = 0-this.tentavelocity;
                this.boost.body.velocity.x = 0-this.tentavelocity;
            }
        }
    },
    stopstrike: function(){
        if(game.time.totalElapsedSeconds() - this.laststrike >= this.tentacd && this.apyet == 1 && this.stoptrigger == 0){
            this.foltime = 0;
            this.laststrike = game.time.totalElapsedSeconds();
            this.stoptrigger = 2;
            this.shadstriketime = game.time.totalElapsedSeconds();
        }
        if(this.stoptrigger == 1 && game.time.totalElapsedSeconds() - this.shadstriketime >=0){
            this.homingtentacle.animations.play('home');
            this.stoptrigger = 2;
            this.hittable = 1;
            
            
        }
        if(this.stoptrigger == 2 && game.time.totalElapsedSeconds() - this.shadstriketime >=0.6){
            this.homingtentacle.animations.play('home');
            this.stoptrigger = 3;
            this.hittable = 1;
            this.charge.play();
            
        }
        if(game.time.totalElapsedSeconds() - this.shadstriketime >= 1.1 && this.stoptrigger ==3){
            this.homingtentacle.animations.play('withdraw');
            this.stoptrigger = 4;
        }
        if(game.time.totalElapsedSeconds() - this.shadstriketime >= 1.6 &&this.stoptrigger ==4){
            this.foltime = 1;
            this.stoptrigger = 0;
            this.laststrike = game.time.totalElapsedSeconds();
            this.hittable = 0;
        }
        if(this.hittable == 1 && this.player.overlap(this.homingtentacle)){
            this.hittable = 0;
            this.augh.play();
            this.damrim.alpha = 0.75;
            game.add.tween(this.damrim).to( {alpha : 0}, 350, Phaser.Easing.Linear.None, true);
            game.globalVars.damage += 1;
            this.player.alpha = 0.5;
            game.add.tween(this.player).to( {alpha : 1}, 1000, Phaser.Easing.Linear.None, true);
        }
        
    },
    
    powerups: function(){
        if(game.time.totalElapsedSeconds()-this.starttime >= 102 && this.flashable == 0){
            this.anim = 0;
            this.shados.animations.stop();
            this.shados.animations.play('flash');
            this.flashable = 1;
            this.tentavelocity = 400;
            this.boost.alpha = 1;
            this.boost.animations.play('boost');
        }
        if(game.time.totalElapsedSeconds()-this.starttime >= 103  && this.flashable == 1){
            this.anim = 1;
            this.boost.alpha = 0;
        }
        
        if(game.time.totalElapsedSeconds()-this.starttime >= 130 && this.flashable == 1){
            this.anim = 0;
            this.shados.animations.stop();
            this.shados.animations.play('flash');
            this.flashable = 2;
            this.tentavelocity = 600;
            this.boost.alpha = 1;
            this.boost.animations.play('boost');
        }
        if(game.time.totalElapsedSeconds()-this.starttime >= 131  && this.flashable == 2){
            this.anim = 1;
            this.boost.alpha = 0;
        }
        
    },
    
    // door: function(){
    //     if(game.time.totalElapsedSeconds() - this.starttime >= 5){
    //         // this.door.alpha = 1;
    //         // if(this.player.overlap(this.door)){
    //         //     this.player.kill();
    //         //     game.state.start('dead');
    //         // }
    //         game.state.start('dead');
    //     }
    // }

};

game.state.add('third', game_state.third);