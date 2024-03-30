import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";
/**
 * There is nothing really wrong with the function. Probably to be safe
 * encoding could be specified as the parameter, however current one is pretty
 * standard. The key thing is that the filePath is being passed to the function. 
 * So all the rest should actually be handled by the test
*/
export async function parsePeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}
