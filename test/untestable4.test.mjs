import pg from "pg";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { PostgresUserDao } from "../src/untestable4.mjs";

describe("Untestable 4: enterprise application", () => {
  /**
   * Another issue is that test itself. There is no clean up function called.
   * This could be handled both on the PSQL UserDao level, but also could be a part of
   * some other helper class.
   */
  let verificationDB;

  beforeAll(() => {
    const pool = {
      user: "testable",
      host: "localhost",
      database: "testable",
      password: "secret",
      port: 5433,
    };
    verificationDB = new pg.Pool(pool);
  });

  afterEach(async () => {
    await verificationDB.query("TRUNCATE TABLE users");
  });

  afterAll(() => {
    const userDao = new PostgresUserDao("test");
    userDao.close();
    verificationDB.end();
  });

  test("Check that the test instance can be established", async () => {
    const userDao = new PostgresUserDao("test");
    const client = await userDao.db.connect();
    expect(client).toBeTruthy();
  });

  test("User can be saved to the table", async () => {
    const userDao = new PostgresUserDao("test");
    const userObj = { userId: 1, passwordHash: "dasdrg32gfwrgr" };
    await userDao.save(userObj);
    const result = await verificationDB.query("SELECT * FROM users;");

    const rows = result.rows;
    expect(rows.length).toBe(1);
    expect(rows[0].user_id).toBe(userObj.userId);
    expect(rows[0].password_hash).toBe(userObj.passwordHash);
  });
});
