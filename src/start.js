import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { ship } from "./ship.js";
import { start_UI } from "./ui.js";

function ship_placement(players, ships){
    for(let i = 0; i < ships.length; i++){
        const curr_ship = ships[i];
        players.gameboard.placeship(curr_ship[0], curr_ship[1], curr_ship[2]);
    }
    
}

export function start_main(){
    //laying off ships right now
    //dont forget to make the ship placement generator
    //player includes gameboard inside.
    let p1 = new Player('Computer');
    let p2 = new Player('Human');
    const ship1 = [[new ship(3), [4, 4], 'vertical'], [new ship(4), [2, 2], 'horizontal'], [new ship(2), [7, 7], 'vertical']];
    const ship2 = [[new ship(3), [4, 4], 'vertical'], [new ship(4), [2, 2], 'horizontal'], [new ship(2), [7, 7], 'vertical']];

    //populating the board.
    ship_placement(p1, ship1);
    ship_placement(p2, ship2);
    start_UI(p1);
    start_UI(p2);
}

