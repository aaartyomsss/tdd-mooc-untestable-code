import { afterAll, afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv } from "../src/untestable3.mjs";
import { writeFile } from 'fs/promises';
import fs from 'fs'
// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

const dir = './tests/tmp'

const getCSVFileData = (rows) => {
  return rows.reduce((acc, personRow) => {
    return acc += `${personRow}\n`
  })
}

describe("Untestable 3: CSV file parsing", () => {

  beforeEach(async () => {
    await fs.mkdirSync('./tests/tmp', {recursive: true})
    writeFile('./tests/tmp/test.csv', '', 'utf8').then(() => {
      console.log("File creates")
    })
  })

  test("todo", async () => {
    // TODO: write proper tests
    try {
      expect(await parsePeopleCsv("people.csv")).to.deep.equal([]);
    } catch (e) {}
  });

  afterEach(async () => {
    await fs.rmSync('./tests', {recursive: true})
  })
});
