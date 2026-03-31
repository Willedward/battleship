import {Gameboard} from './gameboard.js';


function check_for_attacks(gameboard, coords){
    for(let i = 0; i < gameboard.hit.length; i++){
        if(gameboard.hit[i] == coords) return true;
    }

    for(let i = 0; i < gameboard.misses.length; i++){
        if(gameboard.misses[i] == coords) return true;
    }
    return false;
}

export class Player{
    constructor(type){
        this.type = type;
        this.gameboard = new Gameboard();
    }

    makeRandomAttack(opponentGameboard){
        let random_x = Math.floor(Math.random()*10);
        let random_y = Math.floor(Math.random()*10);
        while(check_for_attacks(opponentGameboard, [random_x, random_y])== true){
            random_x = Math.floor(Math.random()*10);
            random_y = Math.floor(Math.random()*10);
        }
        const attack_coord = [random_x, random_y];
        opponentGameboard.receiveattack(attack_coord);
    }
}