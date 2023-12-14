"use client";
import Page from "../bootstrap/Page";
import ManageViewTable from "../bootstrap/ManageViewTable";
import { useContext } from "react";
import { QueryResultsContext } from "@/components/context/QueryResultsContext";

const DataView = ({ setModal }) => {
  const { rowData, setRowData } = useContext(QueryResultsContext);
  return (
    <Page>
      <h1 className="text-center">View Selected Data</h1>
      <ManageViewTable
        data={rowData}
        setData={setRowData}
        tableHeader="Test Data"
        setModal={setModal}
        tableType="manageDataRows"
      />
    </Page>
  );
};
export default DataView;
