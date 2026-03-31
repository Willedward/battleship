import { ship } from "../src/ship.js";

test('ship functionality', ()=>{
    const shp = new ship(2, 'X');
    shp.hit();
    expect(shp.totalhit()).toBe(1);
    expect(shp.length).toBe(2);
});


test('issunk ship functionality', ()=>{
    const shp = new ship(2, 'X');
    shp.hit();
    shp.hit();
    expect(shp.isSunk()).toBe(true);
});