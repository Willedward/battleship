import { player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { ship } from "./ship.js";

export function start_UI(player){
    board_maker(player);
}

function check_ship(coord, gameboard){
    console.log("checker");
    console.log(coord);
    console.log(gameboard);
    if(gameboard.return_object(coord) != null){
        return true;
    }
    return false;
}

function board_maker(player){
    let tree = null;
    const playing_board = document.createElement('div');
    playing_board.classList.add('board');
    console.log(player.type);
    if(player.type == 'Computer'){
        tree = document.querySelector('.rightside');
        playing_board.id = 'Computerboard';
    }else{
        tree = document.querySelector('.leftside');
        playing_board.id = 'Humanboard';
    }
    tree.innerHTML = '';
    tree.appendChild(playing_board);
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            const square = document.createElement('div');
            square.classList.add('square');
            playing_board.appendChild(square);

            //identify if it is human's 
            //highlight human's
            if(player.type == 'Human'){
                console.log(player);
                if(check_ship([i, j], player.gameboard)){
                    square.classList.add('human_ship')
                }
            }
        }
    }

    //coloring based on whether got ship or not.
    //go through one more scanning.


}