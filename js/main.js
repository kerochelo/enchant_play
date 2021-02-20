enchant();

var game;
var pad;

addEventListener('load', function() {
  game = new Game(320, 320);

  game.preload('img/character/chara0.png')

  game.addEventListener('load', function() {
    game.pushScene(game.mainScene());
  });

  game.mainScene = function() {
    var scene = new Scene();
    scene.backgroundColor = 'white';
    var playerSprite = new Sprite(31, 31);
    playerSprite.image = game.assets['img/character/chara0.png'];

    playerSprite.moveTo(10, 10);

    pad = new APad();
		pad.x = 40;
    pad.y = 220;
    scene.addChild(pad);

    playerSprite.addEventListener('enterframe', function() {
      this.frame = 0;
			var speed = 10;
			if ( game.input.left ) {
        this.frame = this.age%2
        this.x -= speed;
      }
      if ( game.input.right ) {
        this.frame = this.age%2
        this.x += speed;
      }
			if ( game.input.up ) {
        this.frame = this.age%2
        this.y -= speed;
      }
			if ( game.input.down ) {
        this.frame = this.age%2
        this.y += speed;
      }

			if ( pad.isTouched ) {
        this.frame = this.age%2
				this.x += pad.vx * speed;
        this.y += pad.vy * speed;
        if ( Math.abs( pad.vx ) < 0.5 ) {
          if ( this.age%4 < 2 ) this.frame = 0;
          else this.frame = 1;
        } else {
          this.frame = this.age%2;
        }
      }
		});

    scene.addChild(playerSprite);
    return scene;
  }
  game.start();
})
