import argon2 from "@node-rs/argon2";
import pg from "pg";

export class PostgresUserDao {
  static instance;

  constructor (env = 'main') {
    const pool = {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: env === 'main' ? process.env.PGDATABASE : 'test-database',
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    }
    this.db = new pg.Pool(pool);
  }

  static getInstance(env = 'main') {
    if (!this.instance) {
      this.instance = new PostgresUserDao(env);
    }

    return this.instance;
  }

  /**
 * The main problem withing the calls is that the DB pool is hardcoded to accept only
 * one user/ db/ schema, etc. This means that our dev (or prod) DB is used for testing as well.
 * To not destroy the DB data, we would need to create a separate DB or at least schema for testing
 * and pass it as a variable.
 *
 * Secondly, there is no deletion function that is needed for the clean up of the DB after the test.
 * Copying the same thing as in the untestable4.test.mjs. There could be a whole DB class created
 * for the robust clean up of the test data, however, for simplicity sake just a deletion function
 * of all users will be added to the PostgresUserDao class.
 */
  // db = new pg.Pool({
  //   user: process.env.PGUSER,
  //   host: process.env.PGHOST,
  //   database: process.env.PGDATABASE,
  //   password: process.env.PGPASSWORD,
  //   port: process.env.PGPORT,
  // });

  close() {
    this.db.end();
  }

  #rowToUser(row) {
    return { userId: row.user_id, passwordHash: row.password_hash };
  }

  async getById(userId) {
    const { rows } = await this.db.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId]
    );
    return rows.map(this.#rowToUser)[0] || null;
  }

  async save(user) {
    await this.db.query(
      `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
      [user.userId, user.passwordHash]
    );
  }
}

export class PasswordService {
  users = PostgresUserDao.getInstance();

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);
    if (!argon2.verifySync(user.passwordHash, oldPassword)) {
      throw new Error("wrong old password");
    }
    user.passwordHash = argon2.hashSync(newPassword);
    await this.users.save(user);
  }
}
