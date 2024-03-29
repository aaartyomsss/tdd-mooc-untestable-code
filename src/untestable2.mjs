function diceRoll() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

/**
 * Nothing can be done really with the function. 
 * It is just a random function that should and its 
 * tests should be property based. For instance, we 
 * could check that it is consistently returns over the period
 * of time (rolls) all the possible values: [1, 2, 3, 4, 5, 6, 101, 102, 103, 104, 105, 106].
 * We could also of course change the random roll algorithm to the ShuffleBag or use faker.random.seed,
 * yet for the dice roll it functionality it feels a bit inappropriate 
 */
export function diceHandValue() {
  const die1 = diceRoll();
  const die2 = diceRoll();
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}
