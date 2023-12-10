"use client"
import { dbConnectService } from "@/services/dbConnectService";
import { useEffect } from "react";
const TestPage = () => {
    useEffect(() => {
        testCall();
    }, []);

   async function testCall() {
         dbConnectService.testConnection().then((res) => console.log(res)).catch((err) => console.error(err));
        dbConnectService.getTables().then((res) => console.log(res)).catch((err) => console.error(err));
        dbConnectService.getTableRows().then((res) => console.log(res)).catch((err) => console.error(err));
        dbConnectService.getTableColumns().then((res) => console.log(res)).catch((err) => console.error(err));
        dbConnectService.updateTableRow().then((res) => console.log(res)).catch((err) => console.error(err));
        dbConnectService.updateTableCol().then((res) => console.log(res)).catch((err) => console.error(err));
        dbConnectService.deleteTable().then((res) => console.log(res)).catch((err) => console.error(err));
        dbConnectService.deleteTableRow().then((res) => console.log(res)).catch((err) => console.error(err));
        dbConnectService.deleteTableColumn().then((res) => console.log(res)).catch((err) => console.error(err));
        dbConnectService.addTable().then((res) => console.log(res)).catch((err) => console.error(err));
        dbConnectService.addTableRow().then((res) => console.log(res)).catch((err) => console.error(err));
        dbConnectService.addTableColumn().then((res) => console.log(res)).catch((err) => console.error(err));
    }
  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}

export default TestPage;