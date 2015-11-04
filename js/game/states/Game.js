GravityDash .Game = function() {}

GravityDash.Game.prototype = {
    create: function() {
        this.background = this.add.sprite(0,0,'background');
        
        this.background.scale.setTo(5);
        this.flappy = this.add.sprite(100,245,'flappy');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.enable(this.flappy,Phaser.Physics.ARCADE);
           // Add gravity to the flappy to make it fall
        this.flappy.body.gravity.y = 1000;
         // Call the 'jump' function when the spacekey is hit
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this); 
        this.add.text(16, 16, "Current State: Game.", { font: "16px Arial", fill: "#ffffff" });
    },
    
    // Make the bird jump 
    jump: function() {  
    // Add a vertical velocity to the bird
    this.flappy.body.velocity.y = -350;
    }

}
