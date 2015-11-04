GravityDash .Game = function() {}

GravityDash.Game.prototype = {
    create: function() {
        this.background = this.add.sprite(0,0,'backgroundGame');
        

        this.background.scale.setTo(1.80);
        this.flappy = this.add.sprite(100,245,'flappy');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.enable(this.flappy,Phaser.Physics.ARCADE);
           // Add gravity to the flappy to make it fall
        this.flappy.body.gravity.y = 1000;
         // Call the 'jump' function when the spacekey is hit
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this); 
        this.add.text(16, 16, "Current State: Game.", { font: "16px Arial", fill: "#ffffff" });

        this.pipes = this.game.add.group(); // Create a group  
        this.pipes.enableBody = true;  // Add physics to the group 
        this.pipes.createMultiple(20, 'Pipe'); // Create 20 pipes
        this.timer = this.game.time.events.loop(2500, this.addRowOfPipes, this); 
    },
    
    addOnePipe: function(x, y) {  
        // Get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();

        // Set the new position of the pipe
        pipe.reset(x, y);
        //meh

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200; 

        // Kill the pipe when it's no longer visible 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    
    addRowOfPipes: function() {
        //pick where the hole will be
        var hole = Math.floor(Math.random() * 5) + 1;
        
        //add the 6 pipes
        for (var i = 0; i < 6; i++){
            if (i != hole && i != hole + 1)
                this.addOnePipe(800, i * 120 + 35);
        }
    },

    
    // Make the bird jump 
    jump: function() {  
    // Add a vertical velocity to the bird
    this.flappy.body.velocity.y = -350;
    }

}
