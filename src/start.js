//start.js
import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { ship } from "./ship.js";
import { start_UI, board_maker, pressing_tiles, show_winner, update_ship_count_ui, click_randomize, disable_start_random, revert_back_btns, game_lock, game_unlock } from "./ui.js";

function ship_placement(players, ships){
    for(let i = 0; i < ships.length; i++){
        const curr_ship = ships[i];
        let verify = players.gameboard.placeship(curr_ship[0], random_coord_generator(), curr_ship[1]);
        while(verify == false){
            verify = players.gameboard.placeship(curr_ship[0], random_coord_generator(), curr_ship[1]);
        }
    }
}


function random_coord_generator(){

        const x_coord = Math.floor(Math.random()*(10));
        const y_coord = Math.floor(Math.random()*10);
        return [x_coord, y_coord];
    }

function random_direction(){
    const num = Math.floor(Math.random()*2);
    if(num == 0) return 'vertical';
    return 'horizontal';
}
export function ship_creation(){
    return [
        [new ship(6), random_direction()],
        [new ship(5), random_direction()],
        [new ship(4), random_direction()],
        [new ship(3), random_direction()],
        [new ship(3), random_direction()],
        [new ship(2), random_direction()]
    ]
}

export function start_main(){
    //laying off ships right now
    //dont forget to make the ship placement generator
    //player includes gameboard inside.
    let p1 = new Player('Computer');
    let p2 = new Player('Human');
    const ship1 = ship_creation();
    const ship2 = ship_creation();
    const reset_btn = document.querySelector('.reset_button');
    reset_btn.disabled = true;
    const winner_announcement = document.querySelector('.winner_announcement');
    winner_announcement.innerHTML = '';
    //populating the board.
    ship_placement(p1, ship1);
    ship_placement(p2, ship2);
    start_UI(p1);
    start_UI(p2);
    console.log(p1);
    console.log(p2);
    
    update_ship_count_ui(p1, remaining_ship_counter(p1));
   
    update_ship_count_ui(p2, remaining_ship_counter(p2));
    console.log("GAME STARTSSSS");
    game_flow_human(p1, p2);
    //console.log(p1);
    //console.log(p2);

}

function turn(p1, p2, curr_player){
    if(curr_player.type == 'Computer'){
        p1.makeRandomAttack(p2.gameboard);
        return;
    }
}





function check_for_gameover(p1, p2){
    if(p1.check_lose()){
        return 'p1';
    }
    if(p2.check_lose()){
        return 'p2';
    }
    return 'None';
}

function coordinate_converter(coord){
    return coord.split(",");
}

function remaining_ship_counter(player){
    let sum = 0;
    for(let i = 0; i < player.gameboard.ships.length; i++){
        if(player.gameboard.ships[i].isSunk() == false){
            sum+=1;
        }
    }
    return sum;
}

/*
function game_flow(p1, p2){
    console.log("game flow teritorry");
    let turns = 0;
    const preset_coord = [[2, 3], [4, 3], [4, 4], [5, 4], [6, 4], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [7, 7], [8, 7]];
    let idx = 0;
    /*
    while(true){
        

        let decision = null;
        if(turns%2 == 0){
            const decision = preset_coord[idx];
            console.log(idx);

            p1.gameboard.receiveattack(decision);
            idx+=1;
            
        }else{
            turn(p1, p2, p1);
        }
        const result = check_for_gameover(p1, p2);
        console.log(`result: ${result}`);
        if(result == 'p1'){
            console.log('HUMAN wins');
            return;
        }else if(result == 'p2'){
            console.log('CP wins');
            return;
        }
        board_maker(p1);
        board_maker(p2);
        turns+=1;
        console.log(preset_coord.length);
        if(idx == preset_coord.length) {console.log("end"); 
            console.log(p1);
            console.log(p2);
            return 'NA';
        }
    }
        

    while(true){
        if(turns %2 == 0){
            let target_square = pressing_tiles();
            while(target_square == null){
                target_square = pressing_tiles();
            }
            p1.gameboard.receiveattack(coordinate_converter(target_square));
            idx+=1;
        }else{
            turn(p1, p2, p1);
        }



        const result = check_for_gameover(p1, p2);
        console.log(`result: ${result}`);
        if(result == 'p1'){
            show_winner('HUMAN');
            return;
        }else if(result == 'p2'){
            show_winner('COMPUTER');
            return;
        }

        board_maker(p1);
        board_maker(p2);
        turns+=1;
        
    }

    
}
*/
export function complete_randomize(){
    click_randomize();
}


export function complete_reset(){
    const reset_btn = document.querySelector('.reset_button');
    reset_btn.addEventListener('click', (e)=>{
        game_unlock();
        start_main();
        
    });
}


export function game_flow_human(p1, p2){
    pressing_tiles((coord)=>{
        game_lock()
        console.log(`coord rec : ${coord}`);
        p1.gameboard.receiveattack(coordinate_converter(coord));
        console.log("P1");
        console.log(p1);
        board_maker(p1);
        board_maker(p2);
        


        console.log("FIRST");
        update_ship_count_ui(p1, remaining_ship_counter(p1));
        update_ship_count_ui(p2, remaining_ship_counter(p2));
        const result = check_for_gameover(p1, p2);
        console.log(`result: ${result}`);
        if(result == 'p1'){
            show_winner('HUMAN');
            return;
        }else if(result == 'p2'){
            show_winner('COMPUTER');
            return;
        }
        game_flow_computer(p1, p2);
    });
}

export function game_flow_computer(p1, p2){
    turn(p1, p2, p1);
    console.log("SECOND");
    console.log("P2 HUMAN BOARD")
    console.log(p2);
    
    board_maker(p1);
    board_maker(p2);
    
    update_ship_count_ui(p1, remaining_ship_counter(p1));
    update_ship_count_ui(p2, remaining_ship_counter(p2));

    const result = check_for_gameover(p1, p2);
        console.log(`result: ${result}`);
        if(result == 'p1'){
            show_winner('HUMAN');
            return;
        }else if(result == 'p2'){
            show_winner('COMPUTER');
            return;
        }


    game_flow_human(p1, p2);
}