var stage1State = {
	create: function () {
		this.onGame = true;
		game.add.sprite(0, 0, 'bg');

		//Música e sons
		this.music = game.add.audio('music');
		this.music.loop = true;
		this.music.volume = .5;
		this.music.play();

		this.sndCoin = game.add.audio('getitem');
		this.sndCoin.volume = .5;

		var num = Math.floor(Math.random() * 2)

		if (num === 0) {
			this.maze = [
				[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
				[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
				[1, 3, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 3, 1],
				[1, 0, 1, 3, 0, 1, 3, 0, 0, 1, 0, 3, 1, 0, 1],
				[1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
				[1, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 1, 0, 0, 1],
				[1, 1, 1, 3, 0, 0, 0, 0, 1, 0, 0, 3, 1, 0, 1],
				[1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
				[1, 3, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 3, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			];
		} else if (num === 1) {
			this.maze = [
				[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
				[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
				[1, 3, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 3, 1],
				[1, 0, 1, 3, 0, 1, 3, 0, 0, 1, 0, 3, 1, 0, 1],
				[1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
				[1, 0, 0, 0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 0, 1],
				[1, 0, 1, 3, 0, 0, 0, 0, 1, 0, 0, 3, 1, 0, 1],
				[1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
				[1, 3, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 3, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			]
		} else if (num === 2) {
			this.maze = [
				[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
				[1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
				[1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
				[1, 0, 1, 3, 0, 1, 3, 0, 0, 1, 0, 3, 1, 1, 1],
				[1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
				[1, 3, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 1, 1],
				[1, 0, 1, 3, 0, 0, 0, 0, 1, 0, 0, 3, 1, 1, 1],
				[1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
				[1, 3, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 3, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			]
		}



		this.blocks = game.add.group();
		this.blocks.enableBody = true;

		this.coinPositions = [];

		for (var row in this.maze) {
			for (var col in this.maze[row]) {
				var tile = this.maze[row][col];

				var x = col * 50;
				var y = row * 50;

				if (tile === 1) {
					var block = this.blocks.create(x, y, 'block');
					block.body.immovable = true;
				} else
					if (tile === 2) {
						this.player = game.add.sprite(x + 25, y + 25, 'player');
						this.player.anchor.set(.5);
						game.physics.arcade.enable(this.player);
						this.player.animations.add('goDown', [0, 1, 2], 12, true);
						this.player.animations.add('goUp', [9, 10, 11], 12, true);
						this.player.animations.add('goRight', [3, 4, 5], 12, true);
						this.player.animations.add('goLeft', [6, 7, 8], 12, true);

					} else
						if (tile === 3) {
							var position = {
								x: x + 25,
								y: y + 25
							};
							this.coinPositions.push(position);
						} else if
							(tile === 4) {
							var block = this.blocks.create(x, y, 'blockM');
							block.body.immovable = true;
						}
			}
		}



		//Criar a moeda
		this.coin = {};
		this.coin.position = this.newPosition();
		this.coin = game.add.sprite(this.coin.position.x, this.coin.position.y, 'coin');
		this.coin.anchor.set(.5);
		this.coin.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true).play();
		game.physics.arcade.enable(this.coin);

		//coletar moeda
		this.coins = 0;
		this.txtCoins = game.add.text(15, 15, 'MOEDAS: ' + this.getText(this.coins), { font: '15px emulogic', fill: '#fff' });


		//controles
		this.controls = game.input.keyboard.createCursorKeys();

		//Partículas
		this.emitter = game.add.emitter(0, 0, 15);
		this.emitter.makeParticles('part');
		this.emitter.setXSpeed(-50, 50);
		this.emitter.setYSpeed(-50, 50);
		this.emitter.gravity.y = 0;

		//Timer
		this.time = 0;
		this.txtTimer = game.add.text(game.world.width - 15, 15, 'TEMPO: ' + this.getText(this.time), { font: '15px emulogic', fill: '#fff' });
		this.txtTimer.anchor.set(1, 0);
		this.timer = game.time.events.loop(1000, function () {
			this.time++;
			this.txtTimer.text = 'TIME: ' + this.getText(this.time);
		}, this);
	},

	update: function () {
		if (this.onGame) {
			game.physics.arcade.collide(this.player, this.blocks);
			game.physics.arcade.overlap(this.player, this.coin, this.getCoin, null, this);

			this.movePlayer();

			if (this.time > 40 || this.coins >= 6) {
				this.gameOver();
			}
		}
	},

	gameOver: function () {

		//Finalizou a fase ou acabou o tempo.
		if (this.coins >= 6) {
			var txtLevelComplete = game.add.text(game.world.centerX, 150, 'FASE FINALIZADA', { font: '50px emulogic', fill: '#fff' });
			txtLevelComplete.anchor.set(.5);
		} else {
			var txtGameOver = game.add.text(game.world.centerX, 150, 'GAME OVER', { font: '50px emulogic', fill: '#fff' });
			txtGameOver.anchor.set(.5);
		}


		game.time.events.add(3500, function () {
			this.music.stop();
			if (this.coins >= 1) {
				game.state.start('end');
			}
		}, this);
	},


	getCoin: function () {
		this.emitter.x = this.coin.position.x;
		this.emitter.y = this.coin.position.y;
		this.emitter.start(true, 500, null, 15);

		this.sndCoin.play();
		this.coins++;
		this.txtCoins.text = 'COINS: ' + this.getText(this.coins);

		this.coin.position = this.newPosition();
	},

	getText: function (value) {
		if (value < 10) {
			return '00' + value.toString();
		}
		if (value < 100) {
			return '0' + value.toString();
		}
		return value.toString();
	},

	movePlayer: function () {
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		if (this.controls.left.isDown && !this.controls.right.isDown) {
			this.player.body.velocity.x = -100;
			this.player.direction = "left";
		} else
			if (this.controls.right.isDown && !this.controls.left.isDown) {
				this.player.body.velocity.x = 100;
				this.player.direction = "right";
			}

		if (this.controls.up.isDown && !this.controls.down.isDown) {
			this.player.body.velocity.y = -100;
			this.player.direction = "up";
		} else
			if (this.controls.down.isDown && !this.controls.up.isDown) {
				this.player.body.velocity.y = 100;
				this.player.direction = "down";
			}

		switch (this.player.direction) {
			case "left":
				this.player.animations.play('goLeft');
				break;
			case "right":
				this.player.animations.play('goRight');
				break;
			case "up":
				this.player.animations.play('goUp');
				break;
			case "down":
				this.player.animations.play('goDown');
				break;
		}

		if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
			this.player.animations.stop();
		}
	},

	newPosition: function () {
		var pos = this.coinPositions[Math.floor(Math.random() * this.coinPositions.length)];

		while (this.coin.position === pos) {
			pos = this.coinPositions[Math.floor(Math.random() * this.coinPositions.length)];
		}

		return pos;
	}

};
