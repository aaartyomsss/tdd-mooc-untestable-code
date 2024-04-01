import { afterAll, describe, expect, test } from "vitest";
import { PostgresUserDao } from "../src/untestable4.mjs";

describe("Untestable 4: enterprise application", () => {
  /**
   * Another issue is that test itself. There is no clean up function called.
   * This could be handled both on the PSQL UserDao level, but also could be a part of
   * some other helper class.
   */
  afterAll(() => {
    const userDao = new PostgresUserDao("test");
    userDao.close();
  });

  test("Check that the test instance can be established", async () => {
    const userDao = new PostgresUserDao("test");
    const client = await userDao.db.connect();
    expect(client).toBeTruthy();
  });

  test.skip("User table can be created", async () => {
    const userDao = new PostgresUserDao("test");
    const user1 = await userDao.getById(1);
    console.log(user1);
  });
});
