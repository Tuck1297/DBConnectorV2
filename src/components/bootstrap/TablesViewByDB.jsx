"use client";
import { useContext, useState } from "react";
import { ConnectionsContext } from "../context/ConnectionsContext";
import { TablesContext } from "../context/TablesContext";
import TableWithRegisteredRadioBtns from "./TableWithRegisteredRadioBtns";
import CustomButton from "../interaction/inputs/CustomButton";
import Table from "./Table";
import { useForm } from "react-hook-form";
import { authSchema } from "@/hooks/yupAuth";
import { dbConnectService } from "@/services/dbConnectService";
import { alertService } from "@/services/alertService";
const TablesViewByDB = ({}) => {
  const { connectionsData, setConnectionsData } =
    useContext(ConnectionsContext);
  const { tablesData, setTablesData } = useContext(TablesContext);
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState(null);

  const schema = authSchema({
    dbradiobtnid: true,
  });

  const { register, handleSubmit, formState, watch, reset } = useForm(schema);
  const { errors } = formState;

  async function onSubmit(data) {
    setLoading(true);
    const selectedDb = connectionsData.find(
      (connection) => connection.id === data.dbradiobtnid
    );
    await dbConnectService
      .getTables(selectedDb.id)
      .then((res) => {
        setTablesData({
            data: res,
            selectedDbName: selectedDb.database_name,
        });
        setLoading(false);
      })
      .catch((err) => {
        alertService.error(err);
        setLoading(false);
      });
  }

  function restart() {
    setTablesData({
        data: [],
        selectedDbName: "",
    });
    reset();
  }

  return (
    <>
      {tablesData.length === 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* TODO replace this with tables/Table */}
          <TableWithRegisteredRadioBtns
            tableData={connectionsData}
            tableHeader="Select Database to see tables."
            registerName="dbRadioBtnId"
            register={register}
            errors={errors}
          />
          <CustomButton
            type="submit"
            className="btn btn-primary w-100 mt-2 mb-2"
            actionWord="Submit"
            isLoading={loading}
            disabled={loading}
          />
        </form>
      ) : (
        <>
          <CustomButton
            type="button"
            className="btn btn-primary w-100 mt-2 mb-2"
            actionWord="See another database's tables."
            onClick={restart}
          />
          <Table
            tableData={tablesData.data}
            tableHeader={`Tables for database ${tablesData.selectedDbName}`}
          />
        </>
      )}
    </>
  );
};

export default TablesViewByDB;
