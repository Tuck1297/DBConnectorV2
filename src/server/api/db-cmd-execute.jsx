import { Sequelize } from "sequelize";
import { db } from "@/server/api/db";
import z from "zod";
import * as pg from "pg";

export const dbCmdExecute = {
  testConnection,
  getTables,
  getTableRows,
  getTableColumns,
  updateTableRow,
  updateTableCol,
  deleteTable,
  deleteTableRow,
  deleteTableColumn,
  addTable,
  addTableRow,
  addTableColumn,
  executeCustomQueries,
};

async function testConnection(connectObj) {
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

  // Construct the connection string
  const connectionString = `${connectObj.database_type}://${connectObj.user_id}:${connectObj.password}@${connectObj.host}:${connectObj.port}/${connectObj.database_name}`;

  // Create a new Sequelize instance with the connection string
  const tempSequelize = new Sequelize(connectionString, { dialectModule: pg });

  // Test the connection
  await tempSequelize.authenticate();
  return true;
}
async function getTables() {}
async function getTableRows() {}
async function getTableColumns() {}
async function updateTableRow(newRowUpdateObj, oldRowUpdateObj, connectionObj) {
  // TODO: add validation
  // Construct the connection string
  const connectionString = `${connectionObj.database_type}://${connectionObj.user_id}:${connectionObj.password}@${connectionObj.host}:${connectionObj.port}/${connectionObj.database_name}`;

  // Create a new Sequelize instance with the connection string
  const tempSequelize = new Sequelize(connectionString, { dialectModule: pg });

  // Build the update query
  let updateQuery = `UPDATE ${connectionObj.current_table_interacting} SET `;

  let whereConditions = "WHERE ";
  let params = {
    replacements: {},
    type: Sequelize.QueryTypes.UPDATE,
  };
  Object.keys(newRowUpdateObj).forEach((key, index) => {
    updateQuery += `${key} = :${key}, `;
    whereConditions += `${key} = :${key}Cond AND `;
    params.replacements[key] = newRowUpdateObj[key];
    params.replacements[`${key}Cond`] = oldRowUpdateObj[key];
  });
  updateQuery = updateQuery.slice(0, -2);
  whereConditions = whereConditions.slice(0, -5);
  updateQuery += ` ${whereConditions}`;
  console.log("updateQuery: ", updateQuery);
  console.log("params: ", params);
  // Execute the update query
  // await tempSequelize.query(updateQuery, params); <-- TODO uncomment this later
}
async function updateTableCol(colUpdateObj) {}
async function deleteTable(tableName) {}
async function deleteTableRow(rowToDeleteObj, connectionObj) {
  // TODO: add validation
  // Construct the connection string
  const connectionString = `${connectionObj.database_type}://${connectionObj.user_id}:${connectionObj.password}@${connectionObj.host}:${connectionObj.port}/${connectionObj.database_name}`;

  // Create a new Sequelize instance with the connection string
  const tempSequelize = new Sequelize(connectionString, { dialectModule: pg });

  // Build the delete query
  let deleteQuery = `DELETE FROM ${connectionObj.current_table_interacting} WHERE `;
  let params = {
    replacements: {},
    type: Sequelize.QueryTypes.DELETE,
  };
  Object.keys(rowToDeleteObj).forEach((key, index) => {
    deleteQuery += `${key} = :${key} AND `;
    params.replacements[key] = rowToDeleteObj[key];
  });
  deleteQuery = deleteQuery.slice(0, -5);
  console.log("deleteQuery: ", deleteQuery);
  console.log("params: ", params);
  // Execute the delete query
  // await tempSequelize.query(deleteQuery, params); <-- TODO uncomment this later
}
async function deleteTableColumn(colName) {}
async function addTable(tableToAddObj) {}
async function addTableRow(rowToAddObj) {}
async function addTableColumn(ColToAddObj) {}

async function executeCustomQueries(queryObj, connectionObj) {
  // TODO: complete this function...
  console.log("queryObj: ", queryObj);
  console.log("connectionObj: ", connectionObj);
  return [
    { id: 1, name: "test1", description: "test1 desc" },
    { id: 2, name: "test2", description: "test2 desc" },
    { id: 3, name: "test3", description: "test3 desc" },
    { id: 4, name: "test4", description: "test4 desc" },
    { id: 5, name: "test5", description: "test5 desc" },
  ]
}
/**
 * Executes a database query with the given query and parameters.
 * @param {string} query - The SQL query to execute.
 * @param {Array} params - The parameters to be used in the query.
 * Must be an object with the following properties:
 *  - replacements: An object of key/value pairs to replace placeholders in the query.
 * The keys should match the placeholders in the query and the values.
 *  - type: The type of query to execute. ex. Sequelize.QueryTypes.SELECT
 * @returns {Promise<any>} - A promise that resolves to the query results.
 */
async function executeQuery(query, params) {
  const results = await db.sequelize.query(query, params);
  return results;
}
