import { Gameboard } from "../src/gameboard.js";
import {ship} from '../src/ship.js';

function return_ship_coords(ship, board){
    let list_of_coord = []
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            if(board[i][j] == ship) list_of_coord.push([i, j]);
        }
    }
    return list_of_coord;
}



test("Testing gameboard", ()=>{
    const gameboard = new Gameboard();
    const ship1 = new ship(4, 'X');
    const ship2 = new ship(3, 'O');
    coord = [[1, 2], [3, 3], [2, 3]];

    gameboard.placeship(ship1, coord[0], 'vertical');
    gameboard.placeship(ship2, coord[1], 'horizontal')
    const curr_board = gameboard.show();
    const id = ship1.identity;
    
    let curr_ship1_coord = return_ship_coords(ship1, curr_board);
    let curr_ship2_coord = return_ship_coords(ship2, curr_board);
    expect(curr_ship1_coord).toEqual([[1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    
    ]);
    expect(curr_ship2_coord).toEqual([
    [3, 3],
    [3, 4],
    [3, 5]
    ]);

    const ship3 = new ship(5, 'X');
    expect(gameboard.placeship(ship3, coord[2], 'vertical')).toEqual(false);

    let curr_ship3_coord = return_ship_coords(ship3, curr_board);
    expect(curr_ship3_coord).toEqual([]);
    /*
    expect(curr_board[1][2]).toBe(ship1);
    expect(curr_board[2][2]).toBe(ship1);
    
    expect(curr_board[3][2]).toBe(ship1);
    expect(curr_board[4][2]).toBe(ship1);
    
    expect(curr_board[5][2]).toBe(null);
    */
});

test('testing receive attack', ()=>{
    const gameboard = new Gameboard();
    const ship1 = new ship(4, 'X');
    const ship2 = new ship(3, 'O');
    coord = [[1, 2], [3, 3], [2, 3]];

    gameboard.placeship(ship1, coord[0], 'vertical');
    gameboard.placeship(ship2, coord[1], 'horizontal')
    const curr_board = gameboard.show();
    const id = ship1.identity;
    
    let curr_ship1_coord = return_ship_coords(ship1, curr_board);
    let curr_ship2_coord = return_ship_coords(ship2, curr_board);

    attack_coord = [[2, 2], [2, 3], [3, 4], [3, 5], [5, 4]];

    //first attack
    gameboard.receiveattack(attack_coord[0])
    expect(ship1.totalhit()).toBe(1);

    //second attack
    gameboard.receiveattack(attack_coord[1]);
    expect(ship1.totalhit()).toBe(1);
    expect(ship2.totalhit()).toBe(0);

    //3rd attack

    gameboard.receiveattack(attack_coord[2]);
    expect(ship1.totalhit()).toBe(1);
    expect(ship2.totalhit()).toBe(1);

    //4th attack
    gameboard.receiveattack(attack_coord[3]);
    expect(ship1.totalhit()).toBe(1);
    expect(ship2.totalhit()).toBe(2);
    
});

//testing misses
test('testing receive attack', ()=>{
    const gameboard = new Gameboard();
    const ship1 = new ship(4, 'X');
    const ship2 = new ship(3, 'O');
    coord = [[1, 2], [3, 3], [2, 3]];

    gameboard.placeship(ship1, coord[0], 'vertical');
    gameboard.placeship(ship2, coord[1], 'horizontal')
    const curr_board = gameboard.show();
    const id = ship1.identity;
    
    let curr_ship1_coord = return_ship_coords(ship1, curr_board);
    let curr_ship2_coord = return_ship_coords(ship2, curr_board);

    attack_coord = [[2, 2], [2, 3], [3, 4], [3, 5], [5, 4]];

    //first attack ee
    gameboard.receiveattack(attack_coord[0])
    

    //second attack
    gameboard.receiveattack(attack_coord[1]);
    
    //3rd attack

    gameboard.receiveattack(attack_coord[2]);
    

    //4th attack
    gameboard.receiveattack(attack_coord[3]);
    gameboard.receiveattack(attack_coord[4]);
    console.log(gameboard.return_miss());
    expect(gameboard.return_miss()).toEqual([[2, 3], [5, 4]]);
    
});

//check if game over

test('testing gameover/all ship sunk', ()=>{
    const gameboard = new Gameboard();
    const ship1 = new ship(4, 'X');
    const ship2 = new ship(3, 'O');
    coord = [[1, 2], [3, 3], [2, 3]];

    gameboard.placeship(ship1, coord[0], 'vertical');
    gameboard.placeship(ship2, coord[1], 'horizontal')
    const curr_board = gameboard.show();
     
    /*
    expect(curr_ship1_coord).toEqual([[1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    
    ]);
    expect(curr_ship2_coord).toEqual([
    [3, 3],
    [3, 4],
    [3, 5]
    ]);
    */
    attack_coord = [[1, 2], [2, 2], [3, 2], [4, 2], [3, 3], [3, 4], [3, 5]];

    //first attack
    for(let i = 0; i < attack_coord.length-1; i++)
    {
        gameboard.receiveattack(attack_coord[i]);
    }
    expect(gameboard.game_over()).toEqual(false);
    
});

