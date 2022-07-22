//*Player Interactions
const wall = 1;

function checkIfPlayerDanger(tileIndex, spikes, blackSpikes, playerStartPos, player) {
  if (tileIndex === spikes || tileIndex === blackSpikes) {
    //  Do something
    console.log("Player is in danger!");
    player.x = playerStartPos[0];
    player.y = playerStartPos[1];
  }
}
//! Broken FIX ME !
function checkPlayerAbleToInteract(player, mouseInfo, map) {
  //Check if player is able to interact with the tile

  let currentPlayerTile = map.worldToTileXY(player.x, player.y);
  let surroundingTiles = map.getTilesWithin(currentPlayerTile.x-1, currentPlayerTile.y-1, 3, 3);

  for (let i = 0; i < surroundingTiles.length; i++) {
      if (surroundingTiles[i].x === mouseInfo.x && surroundingTiles[i].y === mouseInfo.y) {
        //  Do something
        console.log("Player is able to interact with the tile");
        return true;
  }
}
      return false;
}

function pressButton(tile, map){
      const tallButtonBottom = 21;
      const tallButtonTop = 13;
      const shortButton = 20;

      console.log("Button pressed");
      console.log(tile);
      if(tile.index === tallButtonTop || tile.index === tallButtonBottom){
        console.log("Tall Button pressed");
        //*Tall Button
        //Remove black spikes from map
        map.replaceByIndex(17,105);
       
        return;
      }
      if (tile.index === shortButton) {
        //*Short Button
        console.log("Short Button pressed");

        //Remove white spikes from map
        map.replaceByIndex(19,105);
        return;
      }
            
}
      


export { checkIfPlayerDanger, checkPlayerAbleToInteract, pressButton };
