import { ship } from "./ship.js";


export class Gameboard{
    constructor(){
        this.board = [];
        for(let i = 0; i < 10; i++){
            let temp = []
            for(let j = 0; j <10; j++){
                temp.push(null);
            }this.board.push(temp);
        }
        this.misses = [];
        this.hit = []
    }

    populate(shipobj, coord, direction){
        let itr_length = shipobj.length;
        if(direction == 'vertical'){
            for(let i = coord[0]; i<coord[0]+itr_length; i++){
                this.board[i][coord[1]] = shipobj;
            }
        }else{
            for(let j = coord[0]; j<coord[0]+itr_length; j++){
                this.board[coord[0]][j] = shipobj;
            }
        }

    }
    check_for_duplicates(shipobj, coord, direction){
        let itr_length = shipobj.length;
        if(direction == 'vertical'){
            for(let i = coord[0]; i<coord[0]+itr_length; i++){
                if(this.board[i][coord[1]] != null){
                    return 'occupied';
                }
            }
        }else{
            for(let j = coord[0]; j<coord[0]+itr_length; j++){
                if(this.board[coord[0]][j] != null){
                    return 'occupied';
                };
            }
        }
    }

    //Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
    return_object(coord){
        return this.board[coord[0]][coord[1]];
    }
    placeship(shipobj, coord, direction){ //placing ship by index taking in obj
        const ship_length = shipobj.length;

        //verification
        if(direction === 'vertical'){
            const y_coord = coord[1];

            if(y_coord > 10-ship_length){
                return 'Object Y out of bounds';
            }
        }if(direction === 'horizontal'){
            const x_coord = coord[0];

            if(x_coord > 10-ship_length){
                return 'Object X out of bounds';
            }
        }

        //verify for populated already;
        //verification of populated state
        if(this.check_for_duplicates(shipobj, coord, direction) == 'occupied'){
            return false;
            console.log('check')
        };
        //populating
        this.populate(shipobj, coord, direction);
    } 

    show(){
        return this.board;
    }

    //receive attack
    receiveattack(attack_coord){
        const ship_hit = this.board[attack_coord[0]][attack_coord[1]];
        if(ship_hit == null) {
            this.misses.push(attack_coord);
            return attack_coord;
        }
        else{
            ship_hit.hit();
            this.hit.push(attack_coord);
        }
    }
    return_miss(){
        return this.misses;
    }


    //check if everything is sunk
    game_over(){
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                if(this.board[i][j] == null) continue;
                if(this.board[i][j].isSunk() == false){
                    return false;
                }
            }
        }
        return true;
    }

    //reveal system
    
}