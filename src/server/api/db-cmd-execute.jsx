import { Sequelize } from "sequelize";
import { db } from "@/server/api/db";
import z from "zod";
import * as pg from "pg";
import { queryFilter } from "@/hooks/queryFilter";
import { dbConnectionManagement } from "./db-connection-management";

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

  // Create a new Sequelize instance with the connection string
  const tempSequelize = createDbConnectionPoint(connectObj);

  // Test the connection
  await tempSequelize.authenticate();
  return true;
}
async function getTables(connectionObj, userid) {
  // Create a new Sequelize instance with the connection string
  const tempSequelize = createDbConnectionPoint(connectionObj);

  // Get the tables
  // const tables = await tempSequelize.query(
  //   "SELECT * FROM information_schema.tables WHERE table_schema = 'public'",
  //   { type: Sequelize.QueryTypes.SELECT }
  // );

  const tables = await tempSequelize.query(
    `SELECT
    tables.table_name,
    columns.column_name,
    columns.data_type
  FROM
    information_schema.tables
  INNER JOIN
    information_schema.columns
  ON
    tables.table_name = columns.table_name
    AND tables.table_schema = columns.table_schema
  WHERE
    tables.table_schema = 'public' ORDER BY tables.table_name ASC`,
    { type: Sequelize.QueryTypes.SELECT }
  );
  // Update the user's current interacting db
  dbConnectionManagement.updateUserCurrentInteracting(userid, connectionObj.id);
  return tables;
}
async function getTableRows() {}
async function getTableColumns() {}
async function updateTableRow(newRowUpdateObj, oldRowUpdateObj, connectionObj) {
  // TODO: add validation
  // Create a new Sequelize instance with the connection string
  const tempSequelize = createDbConnectionPoint(connectionObj);

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
  await tempSequelize.query(updateQuery, params);
}
async function updateTableCol(colUpdateObj) {}
async function deleteTable(tableName) {}
async function deleteTableRow(rowToDeleteObj, connectionObj) {
  // TODO: add validation
  // Create a new Sequelize instance with the connection string
  const tempSequelize = createDbConnectionPoint(connectionObj);

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
  // console.log("deleteQuery: ", deleteQuery);
  // console.log("params: ", params);
  // Execute the delete query
  await tempSequelize.query(deleteQuery, params);
}
async function deleteTableColumn(colName) {}
async function addTable(tableToAddObj) {}
async function addTableRow(rowToAddObj) {}
async function addTableColumn(ColToAddObj) {}

async function executeCustomQueries(queryObj, connectionObj) {
  // create connection
  const tempSequelize = createDbConnectionPoint(connectionObj);
  // extract all queries
  const { dbconnectid, ...queries } = queryObj;
  // ensure queries are valid
  const queryFilterResult = queryFilter(queries);
  if (queryFilterResult) {
    throw queryFilterResult;
  }
  let selectQuery = "";

  // execute queries
  const promises = [];
  Object.keys(queries).forEach((key) => {
    const query = queries[key];
    if (query.toLowerCase().includes("select")) {
      promises.push(
        tempSequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
      );
      selectQuery = query;
    } else {
      promises.push(tempSequelize.query(query));
    }
  });
  const results = await Promise.all(promises);

  // format results
  const resultsArray = [];
  results.forEach((result) => {
    if (
      typeof result[1] === "object" &&
      result[1].rowCount &&
      result[1].command
    ) {
      // console.log("query result information")
      resultsArray.push(
        `${result[1].rowCount} rows affected. ${result[1].command} command executed successfully.`
      );
    } else {
      // console.log("query result data")
      resultsArray.push(result);
      // Update current table interacting when a select query is executed
      const tableNameIndex =
        selectQuery.toUpperCase().split(" ").indexOf("FROM") + 1;

      const tableName = selectQuery.split(" ")[tableNameIndex];

      // Update the user's current interacting db
      dbConnectionManagement.updateTableCurrentInteracting(
        connectionObj.id,
        tableName
      );
    }
  });

  return resultsArray;
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

function createDbConnectionPoint(connectObj) {
  return new Sequelize(
    `${connectObj.database_type}://${connectObj.user_id}:${connectObj.password}@${connectObj.host}:${connectObj.port}/${connectObj.database_name}`,
    {
      dialectModule: pg,
      dialectOptions: connectObj.host.includes("localhost")
        ? {}
        : {
            ssl: {
              rejectUnauthorized: false,
            },
          },
    }
  );
}
