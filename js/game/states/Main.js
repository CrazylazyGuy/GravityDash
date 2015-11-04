//creating a game object
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

//adding the games states that the game will have 
game.state.add('Boot', GravityDash.Boot);
game.state.add('Preload', GravityDash.Preload);
game.state.add('MainMenu',GravityDash.MainMenu);
game.state.add('Game',GravityDash.Game);
//starts the Boot game state
game.state.start('Boot');

