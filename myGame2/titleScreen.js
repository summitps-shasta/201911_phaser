/*global Phaser game game_state  */

game_state.title = function() {};
game_state.title.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
    },
    
    create: function() {
        // We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // A simple background for our game
        game.add.sprite(0, 0, 'sky');
        // The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();
        // We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;
        // Here we create the ground
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        // Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);
        // Thid stops it from falling away when you jump on it
        ground.body.immovable = true;
        // Now let's create two ledges
        var ledge = this.platforms.create(650, 350, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.75);
        var ledge2 = this.platforms.create(150, 350, 'ground');
        ledge2.body.immovable = true;
        ledge2.scale.setTo(0.75);
        var ledge3 = this.platforms.create(250, 150, 'ground');
        ledge3.body.immovable = true;
        ledge3.scale.setTo(0.75);
        
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        
        this.title = game.add.text(400, 300, "Jason's star game");
        this.title.anchor.set(0.5);
        this.title.font = 'Courier';
        this.title.fontWeight = 'bold';
        this.title.fontSize = 70;
        this.title.fill = '#fff';
        
        this.title = game.add.text(400, 400, "PRESS SPACE TO START");
        this.title.anchor.set(0.5);
        this.title.font = 'Courier';
        this.title.fontWeight = 'bold';
        this.title.fontSize = 30;
        this.title.fill = '#fff';
    },
        
    update: function() {
        if(this.spaceKey.isDown) {
            game.state.start('main');
        }
    },    
};

game.state.add('title', game_state.title);
game.state.start('title');