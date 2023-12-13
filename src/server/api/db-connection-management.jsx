import { Sequelize } from "sequelize";
import { db } from "@/server/api/db";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { connect } from "rxjs";

export const dbConnectionManagement = {
  create,
  delete: _delete,
  update,
  getConnection,
  updateUserCurrentInteracting,
  getAll,
};

async function create(connectObj, userId) {
  const connectSchema = z.object({
    host: z.string({ message: "Host is required and must be a string." }),
    port: z.number({ message: "Port is required and must be a number." }),
    user_id: z.string({ message: "User Id is required and must be a string." }),
    password: z.string({
      message: "Password is required and must be a string.",
    }),
    confirm_password: z.string({
      message: "Confirm Password is required and must be a string.",
    }),
    database_type: z
      .string({ message: "Database type is required and must be a string." })
      .max(20),
    database_name: z.string({
      message: "Database name is required and must be a string.",
    }),
  });
  const userIdSchema = z.string().uuid({ message: "Invalid ID" });

  // Parse and validate the connection object
  connectSchema.parse(connectObj);
  userIdSchema.parse(userId);

  // Check to see if the connection already exists
  const connection = await db.ConnectingInfo.findOne({
    where: {
      host: connectObj.host,
      port: connectObj.port,
      user_id: connectObj.user_id,
      password: connectObj.password,
      database_type: connectObj.database_type,
      database_name: connectObj.database_name,
      owner_id: userId,
    },
  });

  if (connection) {
    throw "Connection already exists";
  }

  const id = uuidv4();
  connectObj.id = id;

  connectObj.owner_id = userId;

  // Create a new Sequelize object and save to database
  const connectionObj = new db.ConnectingInfo(connectObj);
  await connectionObj.save();

  // Update the user's current interacting db
  await updateUserCurrentInteracting(userId, id);
  const toReturn = {
    id: connectObj.id,
    host: connectObj.host,
    database_name: connectObj.database_name,
    database_type: connectObj.database_type,
  };
  return toReturn;
}

async function _delete(id) {
  const connectSchema = z.string().uuid({ message: "Invalid ID" });
  connectSchema.parse(id);
  const connectionObj = await db.ConnectingInfo.findByPk(id);
  await connectionObj.destroy();
}
async function update(connectObj) {
  const connectSchema = z.object({
    host: z.string({ message: "Host is required and must be a string." }),
    port: z.number({ message: "Port is required and must be a number." }),
    user_id: z.string({ message: "User Id is required and must be a string." }),
    password: z.string({
      message: "Password is required and must be a string.",
    }),
    confirm_password: z.string({
      message: "Confirm Password is required and must be a string.",
    }),
    database_type: z
      .string({ message: "Database type is required and must be a string." })
      .max(20),
    database_name: z.string({
      message: "Database name is required and must be a string.",
    }),
  });

  // Parse and validate the connection object
  connectSchema.parse(connectObj);
  const connectionObj = await db.ConnectingInfo.findByPk(connectObj.id);
  Object.assign(connectionObj, connectObj);
  await connectionObj.save();
}
async function getConnection(id) {
  const connectSchema = z.string().uuid({ message: "Invalid ID" });
  connectSchema.parse(id);
  const connectionObj = await db.ConnectingInfo.findByPk(id);
  return connectionObj;
}

async function updateUserCurrentInteracting(userId, connectionId) {
  const userSchema = z.string().uuid({ message: "Invalid ID" });
  userSchema.parse(userId);
  const connectionSchema = z.string().uuid({ message: "Invalid ID" });
  connectionSchema.parse(connectionId);
  const user = await db.User.findByPk(userId);
  user.current_db_interacting = connectionId;
  await user.save();
}

async function getAll(userId) {
  const userIdSchema = z.string().uuid({ message: "Invalid ID" });
  userIdSchema.parse(userId);
  const connections = await db.ConnectingInfo.findAll({
    where: {
      owner_id: userId,
    },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "owner_id",
        "user_id",
        "password",
        "port",
        "schema",
        "current_table_interacting",
      ],
    },
  });
  return connections;
}
