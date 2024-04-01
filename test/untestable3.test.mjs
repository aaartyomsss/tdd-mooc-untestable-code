import { afterAll, afterEach, beforeEach, describe, test, expect } from "vitest";
import { parsePeopleCsv } from "../src/untestable3.mjs";
import { writeFile } from 'fs/promises';
import fs from 'fs'
// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

const dir = './tests/tmp'

const filePath  = dir + '/test.csv'

const getCSVFileData = (rows) => {
  return rows.reduce((acc, personRow) => {
    return acc += `${personRow}\n`
  }, '')
}

describe("Untestable 3: CSV file parsing", () => {

  beforeEach(async () => {
    await fs.mkdirSync('./tests/tmp', {recursive: true})
    writeFile(filePath, '', 'utf8').then(() => {

    })
  })

  test("Able to parse a single row in a file with one row", async () => {
    
    const data = ['Anya,Forger,6,Female']
    await writeFile(filePath, getCSVFileData(data))
    const parsed = await parsePeopleCsv(filePath)
    expect(parsed.length).toBe(1);
    expect(parsed[0].firstName).toBe('Anya')
    expect(parsed[0].lastName).toBe('Forger')
  });

  test("Able to parse csv with multiple rows", async () => {
    const data = ['Anya,Forger,6,Female', 'Loid,Forger,,Male', 'Yor,Forger,27,Female']
    await writeFile(filePath, getCSVFileData(data))
    const parsed = await parsePeopleCsv(filePath)
    expect(parsed.length).toBe(3);
    expect(parsed[1].firstName).toBe('Loid')
    expect(parsed[1].age).toBe(undefined)
  })

  test("Throws error when non-existent path is specifield", async () => {
    try {
      await parsePeopleCsv(dir + '/veriafisdiasid') 
    } catch (error) {
      expect(error.code).toBe('ENOENT')
    }
  })

  afterEach(async () => {
    await fs.rmSync('./tests', {recursive: true})
  })
});
