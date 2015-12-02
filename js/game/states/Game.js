GravityDash.Game = function() {}

GravityDash.Game.prototype = {
    create: function() { 
        this.flip=false;
        this.score = 0;  
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  
        this.background = this.add.sprite(0,0,'backgroundGame');
        

        this.background.scale.setTo(1.80);
        this.flappy = this.add.sprite(100,245,'flappy');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.enable(this.flappy,Phaser.Physics.ARCADE);
           // Add gravity to the flappy to make it fall
        this.flappy.body.gravity.y = 1000;
         // Call the 'jump' function when the spacekey is hit
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var flipKey=this.game.input.keyboard.addKey(Phaser.Keyboard.F);
    
        flipKey.onDown.add(this.flipFunc,this);
        spaceKey.onDown.add(this.jump, this); 
        this.add.text(16, 16, "Current State: Game.", { font: "16px Arial", fill: "#ffffff" });

        this.pipes = this.game.add.group(); // Create a group  
        this.pipes.enableBody = true;  // Add physics to the group 
        this.pipes.createMultiple(20, 'Pipe'); // Create 20 pipes
        this.timer = this.game.time.events.loop(2500, this.addRowOfPipes, this); 
    }, 
        // Make the bird jump 
    jump: function() {  
        // Add a vertical velocity to the bird
        if(this.flip==false){
        this.flappy.body.velocity.y = -350;
        }else{
            console.log("this is happen");
            console.log("this is happen");
            this.flappy.body.velocity.y = 350;
        }
            
    },
    
    flipFunc: function(){
        if(this.flip==true){
            this.flip=false;
            this.flappy.x=0;
            this.flappy.body.gravity.y = 1000;
        }else{
            this.flip=true;
            this.flappy.x=1000;
            this.flappy.body.gravity.y = -1000;
            
        }
    },

    // Restart the game
    restartGame: function() {  
        // Start the 'main' state, which restarts the game
        game.state.start('MainMenu');
    },

        update: function() {
            this.game.physics.arcade.overlap(this.flappy, this.pipes, this.hitPipe, null, this); 
            //this.hitPipe();
                  // If the bird is out of the world (too high or too low), call the 'restartGame' function
            if (this.flappy.inWorld == false){
                this.restartGame(); 
            }
            game.physics.arcade.overlap(this.flappy, this.pipes, this.restartGame, null, this);  
            console.log(this.flip);
        },

        hitPipe: function() {  
        // If the bird has already hit a pipe, we have nothing to do
        if (this.flappy.alive == false)
            return;

        // Set the alive property of the bird to false
        this.flappy.alive = false;

        // Prevent new pipes from appearing
        this.game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);

    },
    
    addOnePipe: function(x, y,flip) {  
        // Get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();

        // Set the new position of the pipe
        pipe.reset(x, y);
        //meh

        // Add velocity to the pipe to make it move left
       if( this.flip==false){
        pipe.body.velocity.x = -200; 
       }else{
           pipe.body.velocity.x=200;
       }

        // Kill the pipe when it's no longer visible 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    
    addRowOfPipes: function() {
        //pick where the hole will be
        var hole = Math.floor(Math.random() * 5) + 1;
        
        //add the 6 pipes
        for (var i = 0; i < 6; i++){
            if (i != hole && i != hole + 1){
                this.addOnePipe(800, i * 120 + 50);
            }
            else if(i != hole && i != hole + 1){
                this.addOnePipe(-800, i * 120 + 50);
            }
                
            this.score += 1;  
            this.labelScore.text = this.score;
        }
    },

    
    // Make the bird jump 
    jump: function() {  
    // Add a vertical velocity to the bird
    this.flappy.body.velocity.y = -350;
    if (this.flappy.alive == false)  
        return; 
    }
}
