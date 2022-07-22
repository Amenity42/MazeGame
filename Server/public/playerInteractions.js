//*Player Interactions 

function checkIfPlayerDanger(tileIndex, spikes, playerStartPos, player) {
      if (tileIndex === spikes) {
        //  Do something
        console.log("Player is in danger!");
        player.x = playerStartPos[0];
        player.y = playerStartPos[1];
      }
}

function checkPlayerAbleToInteract(tileIndex, spikes, playerStartPos, player,mouseX,mouseY) {
      if (tileIndex === spikes) {
        //  Do something

      }
}     


export {checkIfPlayerDanger, checkPlayerAbleToInteract};
