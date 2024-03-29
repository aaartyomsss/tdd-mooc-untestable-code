import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("One day before", () => {
    const dayBeforeChristmas = new Date(2024, 12 - 1, 24)
    expect(daysUntilChristmas(dayBeforeChristmas)).toEqual(1);
  });


  test("Same day", () => {
    const xMas = new Date(2024, 12 - 1, 25)
    expect(daysUntilChristmas(xMas)).toEqual(0);
  });

  test("Next day", () => {
    const dayAfterChristmas = new Date(2024, 12 - 1, 26)
    expect(daysUntilChristmas(dayAfterChristmas)).toEqual(364);
  });

  test("Next day - of the past year", () => {
    const dayBeforeChristmas = new Date(2023, 12 - 1, 26)
    expect(daysUntilChristmas(dayBeforeChristmas)).toEqual(730);
  });

  test("Future date", () => {
    const dayBeforeChristmas = new Date(2025, 12 - 1, 26)
    expect(daysUntilChristmas(dayBeforeChristmas)).toEqual(-1);
  });
});
