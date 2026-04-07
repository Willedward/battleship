 export class ship{
    constructor(length, identity){
        this.length = length;
        this.hits = 0;
        this.identity = identity;
        this.sunk = false;
    }
    totalhit(){
        return this.hits;
    }

    hit(){
        this.hits += 1;
    }
    isSunk(){
        if(this.hits === this.length){
            this.sunk = true;
            return true;
        }return false;
    }

}