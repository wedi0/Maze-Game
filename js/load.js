var loadState = {
	preload: function(){
		var txtLoading = game.add.text(game.world.centerX,150,'LOADING...',{font:'15px emulogic',fill:'#fff'});
			txtLoading.anchor.set(.5);
		
		game.load.image('part','img/part.png');
		game.load.image('bg','img/bg.jpg');
		
		game.load.spritesheet('coin','img/coin.png',32,32);
		game.load.spritesheet('block','img/block.png',50,50);
		game.load.spritesheet('blockM','img/blockM.png',50,50);
		game.load.spritesheet('player','img/astronaut.png',32,32);
		
		game.load.audio('getitem','sfx/getitem.ogg');
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	
	create: function(){
		game.state.start('menu');
	}
};
