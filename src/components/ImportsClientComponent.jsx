"use client";
import { useEffect, useState } from "react";
import { QueryResultsContext } from "./context/QueryResultsContext";
import { QueryBuilderContext } from "./context/QueryBuilderContext";
import { QueryExecuteContext } from "./context/QueryExecuteContext";
import { ConnectionsContext } from "./context/ConnectionsContext";
import { TablesContext } from "./context/TablesContext";
import { ManagePanelContext } from "./context/ManagePanelContext";
// CSS
import "../styles/globals.css";

const ImportsComponent = ({ children }) => {
  const [rowData, setRowData] = useState([]);
  const [builderData, setBuilderData] = useState("");
  const [executeData, setExecuteData] = useState({ querytoexecute: undefined });
  const [connectionsData, setConnectionsData] = useState([]);
  const [tablesData, setTablesData] = useState([]);
  const [managePanelState, setManagePanelState] = useState({
    selectedDB: null,
    selectedTable: null,
    tableInfo: null,
  });
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);
  return (
    <QueryResultsContext.Provider value={{ rowData, setRowData }}>
      <QueryBuilderContext.Provider value={{ builderData, setBuilderData }}>
        <QueryExecuteContext.Provider value={{ executeData, setExecuteData }}>
          <ConnectionsContext.Provider
            value={{ connectionsData, setConnectionsData }}
          >
            <TablesContext.Provider value={{ tablesData, setTablesData }}>
              <ManagePanelContext.Provider
                value={{ managePanelState, setManagePanelState }}
              >
                {children}
              </ManagePanelContext.Provider>
            </TablesContext.Provider>
          </ConnectionsContext.Provider>
        </QueryExecuteContext.Provider>
      </QueryBuilderContext.Provider>
    </QueryResultsContext.Provider>
  );
};
export default ImportsComponent;
