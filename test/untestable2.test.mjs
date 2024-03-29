import { describe, test, expect  } from "vitest";
import { diceHandValue } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {

  const possibleValues = [1, 2, 3, 4, 5, 6, 101, 102, 103, 104, 105, 106]

  test("Returns a single possible value", () => {
    const value = diceHandValue()
    expect(possibleValues).to.include(value);
  });

  test("Returns valid values after a round of testing", () => {
    const retunredValues = []
    for (let i = 0; i < 1000; i++) {
      retunredValues.push(diceHandValue())
    }

    expect(possibleValues).toEqual(expect.arrayContaining(retunredValues))
  })

  /**
   * This is rather a bad test, due to still an astronomically low chance 
   * of one number not poping up after a 100 000 rolls. Though, I believe it is
   * worth the risk. 
   */
  test("Returns valid values after a round of testing at least once", () => {
    const retunredValuesCount = {}

    possibleValues.forEach(v => {
      retunredValuesCount[v] = 0
    })

    for (let i = 0; i < 100000; i++) {
      const value = diceHandValue()
      retunredValuesCount[value] += 1
    }

    possibleValues.forEach(v => {
      expect(v).toBeGreaterThanOrEqual(1)
    }) 
  })
});
