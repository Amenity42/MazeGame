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

var map;
function create() {
  map = this.make.tilemap({ key: "map" });
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

      if(checkIfPlayerDanger(tile.index, spikes, tile.x, tile.y )){
      player.x -= 32;

      }

    } else {
      
      player.x -= 32;
    }
  });

  //  Right
  this.input.keyboard.on("keydown-D", function (event) {
    var tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);

    if (tile.index != ground) {

      //  Blocked, we can't move
      console.log(tile.x); 

      if(checkIfPlayerDanger(tile.index, spikes,tile.x, tile.y)){
        player.x += 32;
      }


    } else {
      player.x += 32;
    }
  });

  //  Up
  this.input.keyboard.on("keydown-W", function (event) {
    var tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);

    if (tile.index != ground) {
      //  Blocked, we can't move

      if(checkIfPlayerDanger(tile.index, spikes,tile.x, tile.y)){
        player.y -= 32;
      }

    } else {

      player.y -= 32;
    }
  });

  //  Down
  this.input.keyboard.on("keydown-S", function (event) {
    var tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);

    if (tile.index != ground) {
      //  Blocked, we can't move

      if(checkIfPlayerDanger(tile.index, spikes,tile.x, tile.y))
      {
        player.y += 32;
      }
    } else {
      player.y += 32;
    }
  });
}

function checkIfPlayerDanger(tileIndex, spikes,x,y) {
      if (tileIndex == spikes) {
        //  Do something
        map.replaceByIndex(tileIndex,-1,x,y,1,1);

        return true;


      }
      return false;
}




