import { checkIfPlayerDanger, checkPlayerAbleToInteract, pressButton } from "./playerInteractions.js";

var config = {
  type: Phaser.AUTO,
  width: 950,
  height: 650,
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
    frameHeight: 48,
  });
  this.load.tilemapCSV("map", "Assets/tilemaps/csv/testTileMap.csv");
}

function create() {
  var map = this.make.tilemap({ key: "map" });
  var tileset = map.addTilesetImage("FD_Dungeon_Free", "tileSet");
  var layer = map.createLayer(0, tileset, 0, 0);
  var player = this.add.image(32 + 16, 32 + 16, "player");

  console.log(`Player pos X: ${player.x} Player pos X:${player.y}`);

  let playerStartPos = [player.x, player.y];

  //*Map tiles
  const ground1 = 105 //*Ground tile;
  const ground2 = 106 //*Ground tile;
  const spikes = 19;
  const blackSpikes = 17;


  //*---------------Player Inputs------------------*

  //*Player movement

    //  Up
    this.input.keyboard.on("keydown-W", keyboard_W);
  
    //  Left
    this.input.keyboard.on("keydown-A", keyboard_A);
  
    //  Down
    this.input.keyboard.on("keydown-S", keyboard_S); 
    
    //  Right
    this.input.keyboard.on("keydown-D", keyboard_D);

  function keyboard_W(event) {
    var tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);
    if (tile.index != ground1) {
      //  Blocked, we can't move
      console.log(tile.index);
      checkIfPlayerDanger(tile.index, spikes, blackSpikes, playerStartPos, player);
    } else {
      player.y -= 32;
    }
  }

  function keyboard_A(event) {
    var tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);
    if (tile.index != ground1) {
      //  Blocked, we can't move
      console.log(tile.index);
      //console.log(event);
      checkIfPlayerDanger(tile.index, spikes, blackSpikes, playerStartPos, player);
    } else {
      player.x -= 32;
    }
  }

  function keyboard_S(event) {
    var tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);
    if (tile.index != ground1) {
      //  Blocked, we can't move
      console.log(tile.index);
      checkIfPlayerDanger(tile.index, spikes, blackSpikes, playerStartPos, player);
    } else {
      player.y += 32;
    }
  }

  function keyboard_D(event) {
    var tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);
    if (tile.index != ground1) {
      //  Blocked, we can't move
      console.log(tile.index);
      console.log('test' + tile.index);
      checkIfPlayerDanger(tile.index, spikes, blackSpikes, playerStartPos, player);

      if(tile.index === -1610512652){
        alert('You have reached the end of the level!');
      }
    } else {
      player.x += 32;
      console.log(`player pos X: ${player.x} Player pos Y:${player.y}`);
    }
  }

  // 

  //Mouse Inputs
  this.input.on('pointerdown', (mousePointer) => {console.log(layer.getTileAtWorldXY(mousePointer.x, mousePointer.y, true))});
  this.input.on('pointerdown', (mousePointer) => { 
   if(checkPlayerAbleToInteract(player, layer.getTileAtWorldXY(mousePointer.x, mousePointer.y, true), map)){
    //console.log('interact');
    let tile = layer.getTileAtWorldXY(mousePointer.x, mousePointer.y, true);
    pressButton(tile, map);  //*Interact with tile
   }
   else{
    console.log('cannot interact');
   }

   });
  
}


