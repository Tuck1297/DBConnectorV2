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
};

async function testConnection(connectObj) {
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

  // Construct the connection string
  const connectionString = `${connectObj.dropdown}://${connectObj.user_id}:${connectObj.password}@${connectObj.host}:${connectObj.port}/${connectObj.name}`;

  // Create a new Sequelize instance with the connection string
  const tempSequelize = new Sequelize(connectionString, {dialectModule: pg});

  // Test the connection
  await tempSequelize.authenticate();
  return true;

}
async function getTables() {}
async function getTableRows() {}
async function getTableColumns() {}
async function updateTableRow(rowUpdateObj) {}
async function updateTableCol(colUpdateObj) {}
async function deleteTable(tableName) {}
async function deleteTableRow(rowToDeleteObj) {}
async function deleteTableColumn(colName) {}
async function addTable(tableToAddObj) {}
async function addTableRow(rowToAddObj) {}
async function addTableColumn(ColToAddObj) {}

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