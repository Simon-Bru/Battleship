// Module generating the position of computer's ships
module.exports = function shipGenerator(gridSize, callback){
  var ships = [];
  // Creation of a battleship (5 squares)
  ships.push(ship(5, gridSize));
  // Creation of 2 destroyers (4 squares)
  ships.push(ship(4, gridSize));
  ships.push(ship(4, gridSize));
  return callback(null, ships);
}

function ship(size, gridSize){
  var coordinates = [[],[]];
  // Origin coordinates randomly generated (can be from 0 to gridSize - size of boat)
  coordinates[0][0] = Math.round(Math.random()*(gridSize-size));
  coordinates[0][1] = Math.round(Math.random()*(gridSize-size));
  // Determination of the axe we will orientate the ship
  var axe = Math.round(Math.random()); //0->X 1->Y
  // Assignation of the end coordinates
  coordinates[1][1-axe] = coordinates[0][1-axe];
  coordinates[1][axe] = coordinates[0][axe] + size;

  return coordinates;
}

//Function returning false if ship1 is over ship2
function Over(ship1, ship2){
  switch(ship1[0][0]){
    case ship1[1][0]:
      var axe = 0;
      break;

    default:
      var axe = 1;
      break;
  }

  switch(ship2[0][0]){
    case ship2[0][0]:
      var axe2 = 0;
      break;

    default:
      var axe2 = 1;
      break;
  }

  switch(axe){
    case axe2:        //If ships' orientation is on the same axe
      if(ship1[0][axe] == ship2[0][axe2]){  //If ships are on the same axe coordinate
          if(ship1[0][(axe-1)*(-1)] < ship2[0][(axe-1)*(-1)] && ship1[1][(axe-1)*(-1)] < ship2[0][(axe-1)*(-1)]){  //If origin and end of ship1 < origin of ship2
            return false;
          }
          else if(ship2[0][(axe-1)*(-1)] < ship1[0][(axe-1)*(-1)] && ship2[1][(axe-1)*(-1)] < ship1[0][(axe-1)*(-1)]){  //If origin and end of ship2 < origin of ship1
            return false;
          }
          else { //Else, ship2 is over ship1
            return true;
          }
      }
      else {
        return false;                        //Else -> they are paralels, return false
      }
      break;

    default:      //If ships are not oriented the same way
      for(var x = ship1[0][(axe-1)*(-1)]; x < ship1[1][(axe-1)*(-1)]; x++){   //For each axe coordinate of ship1
        if(x == ship2[0][axe2]){
          for(var y = ship2[0][(axe2-1)*(-1)]; y < ship2[1][(axe2-1)*(-1)]; y++){
            if(y == ship1[0][axe]){
              return true;
            }
          }
          return false;
          break;
        }
      }
      break;
  }

}
