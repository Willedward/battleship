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
        this.hit = [];
        this.ships = [];
    }

    populate(shipobj, coord, direction){
        let itr_length = shipobj.length;
        if(direction == 'vertical'){
            for(let i = coord[0]; i<coord[0]+itr_length; i++){
                this.board[i][coord[1]] = shipobj;
            }
        }else{
            for(let j = coord[1]; j<coord[1]+itr_length; j++){
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
            for(let j = coord[1]; j<coord[1]+itr_length; j++){
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
        console.log(coord);
        
        //console.log("ships array");
        //console.log(this.ships);
        //verification
        if(direction === 'vertical'){
            const y_coord = coord[0];

            if(y_coord > 10-ship_length){
                return false;
            }
        }if(direction === 'horizontal'){
            const x_coord = coord[1];

            if(x_coord > 10-ship_length){
                return false;
            }
        }

        //verify for populated already;
        //verification of populated state
        if(this.check_for_duplicates(shipobj, coord, direction) == 'occupied'){
            return false;
            //console.log('check')
        };
        //populating
        this.populate(shipobj, coord, direction);
        this.ships.push(shipobj);
        return true;
    } 

    show(){
        return this.board;
    }

    

    //receive attack

    change_layout(coord, state){
        
        this.board[coord[0]][coord[1]] = state;
    }   

    receiveattack(attack_coord){
        console.log("attack coord``````");
        console.log(attack_coord);
        const ship_hit = this.board[attack_coord[0]][attack_coord[1]];
        if(ship_hit == null) {
            this.misses.push(attack_coord);
            this.change_layout(attack_coord, 'MISS');
            //return attack_coord;
        }else if(ship_hit == 'SUNK'){
            return;
        }else if(ship_hit == 'MISS'){
            return;
        }//validate if the coord to attack will avoid miss.
        else{
            ship_hit.hit();
            this.hit.push(attack_coord);
            this.change_layout(attack_coord, 'SUNK');
        }
    }
    return_miss(){ //for calling out and building UI.
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