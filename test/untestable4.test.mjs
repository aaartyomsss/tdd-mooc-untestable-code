import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";

describe("Untestable 4: enterprise application", () => {
  let service;
  beforeEach(() => {
    service = new PasswordService();
  });

  /**
   * Another issue is that test itself. There is no clean up function called.
   * This could be handled both on the PSQL UserDao level, but also could be a part of
   * some other helper class.
   */
  afterEach(() => {
    PostgresUserDao.getInstance().close();
  });

  test("todo", async () => {
    // TODO: write proper tests for both PasswordService and PostgresUserDao
  });
});
