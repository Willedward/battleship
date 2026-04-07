//ui.js
import { player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { ship } from "./ship.js";
import {  start_main } from "./start.js";

export function start_UI(player){
    board_maker(player);
}
function check_ship(coord, gameboard){
    //console.log("checker");
    //console.log(coord);
    //console.log(gameboard);
    if(gameboard.return_object(coord) instanceof ship){
        return true;
    }
    return false;
}

function returner_tiles(coord, gameboard){
    return gameboard.return_object(coord);
}

export function board_maker(player){
    let tree = null;
    const playing_board = document.createElement('div');
    playing_board.classList.add('board');
    //console.log(player.type);
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
            square.id = `${i},${j}`;

            //identify if it is human's 
            //highlight human's

            
            if(player.type == 'Human'){
                //console.log(player);
                if(check_ship([i, j], player.gameboard)){
                    square.classList.add('human_ship')
                }
            }
            const tiles = returner_tiles([i, j], player.gameboard);
            if(tiles == 'MISS'){
                square.classList.add('miss');

            }
            if(tiles == 'SUNK'){
                square.classList.add('sunk');
            }
            
        }
    }
    //coloring based on whether got ship or not.
    //go through one more scanning.
}

export function pressing_tiles(callback){
    //only humans on computer 
    const rightside = document.querySelector('.rightside');
    const board = document.querySelector('#Computerboard');

    function handleclick(e){
        const target_square = e.target;
        if(!target_square.classList.contains("square")) return null;
        if(target_square.classList.contains('miss')) return null;
        if(target_square.classList.contains('sunk')) return null;
        const target_square_id = e.target.id;
        board.removeEventListener('click', handleclick);
        callback(target_square_id);
    }

    board.addEventListener('click', handleclick);
}

export function show_winner(winner){
    const announcement = document.querySelector('.winner_announcement');
    const winner_ui = document.createElement('div');
    winner_ui.classList.add('winner');
    announcement.appendChild(winner_ui);
    winner_ui.textContent = `${winner} WINS!!`;
    
}

export function click_randomize(){
    const btn_rand = document.querySelector('.rand_button');
    btn_rand.addEventListener('click', (e)=>{
        start_main();
    });

}

export function update_ship_count_ui(player, remaining_ships){
    if(player.type == 'Computer'){
        const computer_counter = document.querySelector('.remaining_num_cp');
        computer_counter.textContent = remaining_ships;
    }else{
        const human_counter = document.querySelector('.remaining_num_human');
        human_counter.textContent = remaining_ships;
    }
}



export function game_lock(){
    //const start_btn = document.querySelector('.start_button');
    const rand_btn = document.querySelector('.rand_button');
    const reset_btn = document.querySelector('.reset_button');
    //start_btn.disabled = true;
    rand_btn.disabled = true; 
    rand_btn.classList.add('.disabled'); 
    reset_btn.disabled = false;
    reset_btn.classList.remove('disabled');
}

export function game_unlock(){
    //const start_btn = document.querySelector('.start_button');
    const rand_btn = document.querySelector('.rand_button');
    const reset_btn = document.querySelector('.reset_button');
    //start_btn.disabled = false;
    rand_btn.disabled = false;
    rand_btn.classList.remove('disabled');
    reset_btn.disabled = true;
    reset_btn.classList.add('disabled');
}