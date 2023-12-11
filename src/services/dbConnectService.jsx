import { fetchWrapper } from "@/hooks/fetchWrapper";

let baseUrl = "http://localhost:3000/api";

export const dbConnectService = {
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

async function testConnection(connectionObj) {
  console.log(connectionObj)
 return await fetchWrapper.post(baseUrl + "/test/connection", connectionObj);
}
async function getTables() {
 return await fetchWrapper.get(baseUrl + "/tables");
}
async function getTableRows() {
 return await fetchWrapper.get(baseUrl + "/table_rows");
}
async function getTableColumns() {
 return await fetchWrapper.get(baseUrl + "/table_cols");
}
async function updateTableRow(toUpdate) {
 return await fetchWrapper.put(baseUrl + "/table_row", toUpdate);
}
async function updateTableCol(toUpdate) {
 return await fetchWrapper.put(baseUrl + "/table_col", toUpdate);
}
async function updateTable(toUpdate) {
 return await fetchWrapper.put(baseUrl + "/table", toUpdate);
}
async function deleteTable(tableName) {
 return await fetchWrapper.delete(baseUrl + `/table`, { name: tableName });
}
async function deleteTableRow(row) {
 return await fetchWrapper.delete(baseUrl + `/table_row`, row);
}
async function deleteTableColumn(colName) {
 return await fetchWrapper.delete(baseUrl + `/table_col`, { name: colName });
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
