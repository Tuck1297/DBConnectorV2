import { Sequelize, DataTypes } from "sequelize";
import ConnectionsModel from "./models/connections";
import UserModel from "./models/user";
import { models } from "@auth/sequelize-adapter";
import * as pg from "pg";

export const db = {
  initialized: false,
  defined: false,
  sequelize: null,
  initialize,
  connection,
};
async function connection() {
    const database = process.env.DB_NAME;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const dialect = process.env.DB_DIALECT;

    // console.log("database: ", database)
    // console.log("user: ", user)
    // console.log("password: ", password)
    // console.log("host: ", host)
    // console.log("port: ", port) 
    // console.log("dialect: ", dialect)

  const sequelize = new Sequelize(database, user, password, {
    dialect: dialect,
    dialectModule: pg,
    host: host,
    port: port,
    // logging: console.log,
    logging: false,
  });
  db.sequelize = sequelize;
  db.defined = true;
}
async function initialize() {
  if (!db.defined) {
    db.connection();
  }

  db.ConnectingInfo = ConnectionsModel(db.sequelize, DataTypes);
  db.User = UserModel(db.sequelize, DataTypes, models.User);
  await db.sequelize.sync({ alter: true });
  db.initialized = true;
}

