'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack , endStack) => {
  // Your code here
  // we are going to take the last element of the array
  // move it to another array
 
 const removedPiece = stacks[startStack].pop()
 stacks[endStack].push(removedPiece)

}


// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack , endStack) => {
  // Your code here

  // use a conditional to check if the code is allowed 
  // large numbers should not be stack on top of smaller number
  // I believe I need to check if whatever numbers gets moved is not placed in an array that has smaller item so
  //maybe using .length to check the array
  //or maybe I need to check if the number moved[from the starstack] is greater than the number that is
  //on the endStack?
  if (!stacks[endStack].length){
    console.log("move is legal");
    return true
  }
  if (stacks[startStack][stacks[startStack].length -1] < stacks[endStack][stacks[endStack].length -1] ){
    console.log("move is legal");
    return true
  } else {
    console.log("move is not allowed")
    return false
  }

}

// What is a win in Towers of Hanoi? When should this function run?

// checks the array when all removedpieces are in order from large number first to small number using .length
// if this is the case then is true and print out "you win"
const checkForWin = () => {
  // Your code here
  if( stacks.b.length == 4 || stacks.c.length == 4 ){
    console.log("you win!")
    return true
  }
  else{
    return false
  }

}

// When is this function called? What should it do with its argument?
// this is the main code that will run the whole game , check if you win and if the moves are legal
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if (isLegal(startStack, endStack)){
    movePiece(startStack, endStack);
    checkForWin();
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
