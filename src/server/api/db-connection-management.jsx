import { Sequelize } from "sequelize";
import { db } from "@/server/api/db";
import z from "zod";
import { v4 as uuidv4 } from 'uuid';

export const dbConnectionManagement = {
  create,
  delete: _delete,
  update,
  getConnection,
  updateUserCurrentInteracting,
};

async function create(connectObj) {
  const connectSchema = z.object({
    host: z.string(),
    port: z.number(),
    user_id: z.string(),
    password: z.string(),
    confirm_password: z.string(),
    schema: z.string(),
    dropdown: z.string().max(20),
    name: z.string(),
  });

  // Parse and validate the connection object
  connectSchema.parse(connectObj);

  const id = uuidv4();
  connectObj.id = id;

  connectObj.database_type = connectObj.dropdown;

  connectObj.database_name = connectObj.name;

  // Create a new Sequelize object and save to database
  const connectionObj = new db.ConnectingInfo(connectObj);
  await connectionObj.save();
}
async function _delete(id) {
  const connectSchema = z.string().uuid({ message: "Invalid ID" });
  connectSchema.parse(id);
  const connectionObj = await db.ConnectingInfo.findByPk(id);
  await connectionObj.destroy();
}
async function update(connectObj) {
  const connectSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID" }),
    host: z.string(),
    port: z.number(),
    user_id: z.string(),
    password: z.string(),
    schema: z.string(),
    dropdown: z.string().max(20),
    name: z.string(),
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
