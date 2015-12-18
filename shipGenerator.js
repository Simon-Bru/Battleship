// Module generating the position of computer's ships
exports.generate = function generate(gridSize, callback){
  var ships = [];
  // Creation of a battleship (5 squares)
  ships.push(ship(4, gridSize));
  // Creation of 2 destroyers (4 squares)
  var destroyer = ship(3, gridSize);
  //while the destroyer is over the battleship
  while(Over(ships[0], destroyer)){
    destroyer = ship(3, gridSize);  //We generate an other ship
  }
  //We add the destroyer to the table
  ships.push(destroyer);
  var destroyer2 = ship(3, gridSize);
  //While destroyer2is over the battleship or the destroyer1
  while(Over(ships[0], destroyer2) || Over(ships[1], destroyer2)){
    destroyer2 = ship(3, gridSize);       //We generate an other ship
  }
  ships.push(destroyer2);
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
  //Definition of the orientation axe of ship1
  var axe = orientation(ship1);

  // Definition of the orientation of ship2
  var axe2 = orientation(ship2);

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
        if(x == ship2[0][axe2]){                                                //If the coordinate is equal to the orientation axe of ship2
          for(var y = ship2[0][(axe2-1)*(-1)]; y < ship2[1][(axe2-1)*(-1)]; y++){  //For each axe coordinate of ship2
            if(y == ship1[0][axe]){                                                     //If the coordinate is equal to the orientation axe of ship1
              return true;                                                                //Ships are superimposed
            }
          }
          return false;
          break;
        }
      }
      break;
  }
}

// Function returning the orientation axe of the ship
function orientation(ship){
  switch(ship[0][0]){
    case ship[1][0]:
      return 0;
      break;

    default:
      return 1;
      break;
  }
}

// Function to tell a ship is touched after a hit
exports.isHit = function isHit(hit, ships){
  var axe,
    bool;
  ships.forEach(function(ship){
    axe = orientation(ship);
    if(hit[axe] == ship[0][axe]){
      for(var i=ship[0][(axe-1)*(-1)]; i < ship[1][(axe-1)*(-1)]; i++){
        if(hit[(axe-1)*(-1)] == i){
          bool = true;
          break;
        }
      }
    }
  });
  return bool;
}
