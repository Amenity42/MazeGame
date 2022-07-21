var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload: preload,
    create: create,
  },
};

var game = new Phaser.Game(config);

function preload() {
  //this.load.setBaseURL('http://labs.phaser.io');
  this.load.image(
    "tileSet",
    "Assets/FantasyDreamland/32x32/FD_Dungeon_Free.png"
  );
  this.load.spritesheet("player", "Assets/Blue_witch/B_witch_run.png", {
      frameWidth: 28,
      frameHeight: 48
      });
  this.load.tilemapCSV("map", "Assets/tilemaps/csv/testTileMap.csv");
}

function create() {
  var map = this.make.tilemap({ key: "map" });
  var tileset = map.addTilesetImage("FD_Dungeon_Free", "tileSet");
  var layer = map.createLayer(0, tileset, 0, 0);      
  var player = this.add.image(32 + 16, 32 + 16, "player");

  //*Map tiles
  const ground = -1;
  const spikes = 18;

  //  Left
  this.input.keyboard.on("keydown-A", function (event) {
    var tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);

    if (tile.index != ground) {
      //  Blocked, we can't move
      console.log(tile.index);
    } else {
      checkIfPlayerDanger(tile.index, spikes);
      player.x -= 32;
    }
  });

  //  Right
  this.input.keyboard.on("keydown-D", function (event) {
    var tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);

    if (tile.index != ground) {
      //  Blocked, we can't move
      console.log(tile.index);
    } else {
      checkIfPlayerDanger(tile.index, spikes);

      player.x += 32;
    }
  });

  //  Up
  this.input.keyboard.on("keydown-W", function (event) {
    var tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);

    if (tile.index != ground) {
      //  Blocked, we can't move
      console.log(tile.index);

    } else {
      checkIfPlayerDanger(tile.index, spikes);

      player.y -= 32;
    }
  });

  //  Down
  this.input.keyboard.on("keydown-S", function (event) {
    var tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);

    if (tile.index != ground) {
      //  Blocked, we can't move
      console.log(tile.index, spikes);

    } else {
      checkIfPlayerDanger();

      player.y += 32;
    }
  });
}

function checkIfPlayerDanger(tileIndex, spikes) {
      if (tileIndex === spikes) {
        //  Do something
        console.log("Player is in danger!");

      }
}




