const enhancer = require('./enhancer.js');

// arrange
// random typical object
const obj1 = {
    name: "Object 1",
    durability: 50,
    enhancement: 10
};
// holds strings
const obj2 = {
    name: "Object 2",
    durability: "5",
    enhancement: "1"
};
// holds max values
const obj3 = {
    name: "Object 3",
    durability: 100,
    enhancement: 20
};
// holds min values
const obj4 = {
    name: "Object 4",
    durability: 0,
    enhancement: 0
}

// additional objects for fail(item)
const obj5 = {
    name: "Object 5",
    durability: 45,
    enhancement: 15
}

const obj6 = {
    name: "Object 6",
    durability: 9,
    enhancement: 17
}


describe('the enhancer', () => {
    // a repair(item) method accepts an item object
    // returns a new item with the durability restored to 100
    describe('the repair function', () => {
        it('should restore the durability', () => {
            // assert
            expect(enhancer.repair(obj1).durability).toBe(100);
            expect(enhancer.repair(obj2).durability).toBe(100);
            expect(enhancer.repair(obj3).durability).toBe(100);
            expect(enhancer.repair(obj4).durability).toBe(100);
        });
        it('should return a new item', () => {
            // act
            const result = enhancer.repair(obj1);
            // assert
            expect(result).not.toBe(obj1);
        });
    });

    // a success(item) method accepts an item object
    // returns a new item object modified according to this rules:
    // - The item's enhancement increases by 1.
    // - If the item enhancement level is 20, the enhancement level is not changed.
    // -The durability of the item is not changed.
    describe('the success function', () => {
        const result = enhancer.succeed(obj1);
        it('returns new object', () => {
            expect(result).not.toBe(obj1);
        });
        it('should increase enhancement by 1, if enhancement < 20', () => {
            expect(enhancer.succeed(obj4).enhancement).toBe(1);
        });
        it('enhancement level should not be more then 20', () => {
            expect(enhancer.succeed(obj3).enhancement).toBe(20);
        });
        it('should handle non-number objects', () => {
            expect(enhancer.succeed(obj2).enhancement).toBe(2);
        });
    });

    // a fail(item) method accepts an item object
    // returns a new item  object modified according to this rules:
    // - item's enhancement is less than 15? => the durability of the item is decreased by 5
    // - item's enhancement is 15 or more? => the durability of the item is decreased by 10.
    // - item's enhancement level is greater than 16? => the enhancement level decreases by 1 (17 goes down to 16, 18 goes down to 17).
    describe('the fail function', () => {
        const result = enhancer.fail(obj2);
        it('returns new object', () => {
            expect(result).not.toBe(obj2);
        });
        it('should decrease durability of the item by 5 if enhancement < 15', () => {
            expect(enhancer.fail(obj1).durability).toBe(45);
        });
        it('should decrease durability of the item by 10 if enhancement >= 15', () => {
            expect(enhancer.fail(obj5).durability).toBe(35);
        });
        it('should decrese enhancement level by 1 if enhancement > 16', () => {
            expect(enhancer.fail(obj6).enhancement).toBe(16);
            expect(enhancer.fail(obj5).enhancement).toBe(15);
        });
    });

});