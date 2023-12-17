import { fetchWrapper } from "@/hooks/fetchWrapper";

let baseUrl = "http://localhost:3000/api";

export const dbConnectService = {
  testConnection,
  getTables,
  getTableRows,
  getTableColumns,
  updateTableRow,
  updateTableCol,
  updateTable,
  deleteTable,
  deleteTableRow,
  deleteTableColumn,
  addTable,
  addTableRow,
  addTableColumn,
  executeCustomQueries,
  deleteDatabase
}; 

async function testConnection(connectionObj) {
  // console.log(connectionObj)
 return await fetchWrapper.post(baseUrl + "/test/connection", connectionObj);
}
async function getTables(dbId) {
 return await fetchWrapper.get(baseUrl + `/tables/${dbId}`);
}
async function getTableRows() {
 return await fetchWrapper.get(baseUrl + "/table_rows");
}
async function getTableColumns(tableName) {
 return await fetchWrapper.get(baseUrl + `/table_cols/${tableName}`);
}
async function updateTableRow(toUpdate, oldRow) {
 return await fetchWrapper.put(baseUrl + "/table_row", {update: toUpdate, old: oldRow});
}
async function updateTableCol(toUpdate, oldCol) {
 return await fetchWrapper.put(baseUrl + "/table_col", {toUpdate, oldCol});
}
async function updateTable(toUpdate, oldData) {
 return await fetchWrapper.put(baseUrl + "/table", {toUpdate, oldData});
}
async function deleteTable(tableName) {
 return await fetchWrapper.delete(baseUrl + `/table`, tableName );
}
async function deleteTableRow(row) {
 return await fetchWrapper.delete(baseUrl + `/table_row`, row);
}
async function deleteTableColumn(colName, tableName) {
 return await fetchWrapper.delete(baseUrl + `/table_col`, {colName, tableName} );
}
async function addTable(tableToAdd) {
 return await fetchWrapper.post(baseUrl + "/table", tableToAdd);
}
async function addTableRow(rowToAdd) {
 return await fetchWrapper.post(baseUrl + "/table_row", rowToAdd);
}
async function addTableColumn(colToAdd) {
 return await fetchWrapper.post(baseUrl + "/table_col", colToAdd);
}

async function executeCustomQueries(queries) {
 return await fetchWrapper.post(baseUrl + "/custom_queries", queries);
}

async function deleteDatabase(dbId) {
 return await fetchWrapper.delete(baseUrl + `/database`, dbId);
}