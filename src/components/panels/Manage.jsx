import Page from "../bootstrap/Page";
import { useState, useContext, useRef } from "react";
import { ManagePanelContext } from "../context/ManagePanelContext";
import CustomButton from "../interaction/inputs/CustomButton";
import { ConnectionsContext } from "../context/ConnectionsContext";
import { useForm } from "react-hook-form";
import { authSchema } from "@/hooks/yupAuth";
import { dbConnectService } from "@/services/dbConnectService";
import { alertService } from "@/services/alertService";
import Table from "../tables/Table";
import RadioButton from "../interaction/inputs/RadioButton";
import TextBox from "../interaction/inputs/Textbox";
import ColumnNameUpdateForm from "../interaction/form/ColumnNameUpdateForm";
import TableNameUpdateForm from "../interaction/form/TableNameUpdateForm";
const ManagePanel = ({ setModal }) => {
  const { managePanelState, setManagePanelState } =
    useContext(ManagePanelContext);
  const { connectionsData } = useContext(ConnectionsContext);
  const [loading, setLoading] = useState(false);
  const [showTables, setShowTables] = useState(false);
  const [showDBs, setShowDBs] = useState(true);
  const [showTableInfo, setShowTableInfo] = useState(
    managePanelState.tableInfo !== null ? true : false
  );
  const [newColName, setNewColName] = useState({});
  const updateColumnNameRef = useRef();
  const updateTableNameRef = useRef();

  function restart() {
    setManagePanelState({
      selectedDB: null,
      selectedTable: null,
      tablesInSelectedDB: [],
      tableInfo: null,
    });
    setShowTables(false);
    setShowDBs(true);
    setShowTableInfo(false);
  }

  const dbSchema = authSchema({ dbconnectid: true });
  const tableSchema = authSchema({ tableselection: true });

  const {
    register: dbRegister,
    handleSubmit: dbHandleSubmit,
    formState: dbFormState,
    watch: dbWatch,
  } = useForm(dbSchema);

  const {
    register: tableRegister,
    handleSubmit: tableHandleSubmit,
    formState: tableFormState,
    watch: tableWatch,
  } = useForm(tableSchema);

  const { errors: dbErrors } = dbFormState;
  const { errors: tableErrors } = tableFormState;

  function dbOnSubmit(data) {
    setLoading(true);
    dbConnectService
      .getTables(data.dbconnectid)
      .then((res) => {
        let tables = res.filter((obj, index, array) => {
          const currentIndex = array.findIndex(
            (item) => item.table_name === obj.table_name
          );
          return currentIndex === index;
        });
        tables = tables.map((table) => {
          return { table_name: table.table_name };
        });
        setManagePanelState({
          ...managePanelState,
          selectedDB: data.dbconnectid,
          tablesInSelectedDB: tables,
        });
        setShowTables(true);
        setShowDBs(false);
        setLoading(false);
      })
      .catch((err) => {
        alertService.error(err);
        setLoading(false);
      });
  }

  function tableOnSubmit(data) {
    setLoading(true);
    dbConnectService
      .getTableColumns(data.tableselection)
      .then((res) => {
        // console.log("Columns: ", res);
        // TODO: populate columns and table name to where they need to go
        setLoading(false);
        setManagePanelState({
          ...managePanelState,
          selectedTable: data.tableselection,
          tableInfo: res,
        });
        setShowTableInfo(true);
        setShowTables(false);
      })
      .catch((err) => {
        alertService.error(err);
        setLoading(false);
      });
  }

  function getNewColumnName() {
    return updateColumnNameRef.current.getNewColumnName();
  }

  function getNewTableName() {
    return updateTableNameRef.current.getNewTableName();
  }

  return (
    <Page>
      <h1 className="text-center">Mange</h1>
      {showDBs && managePanelState.selectedDB === null ? (
        <form onSubmit={dbHandleSubmit(dbOnSubmit)} className="p-2">
          <Table
            data={connectionsData.map((connection) => {
              return {
                Select: (
                  <RadioButton
                    register={dbRegister}
                    value={connection.id}
                    registerGroupName="dbConnectId"
                  />
                ),
                ...connection,
              };
            })}
            tableHeader="Select Database Connection"
          />
          <div className="text-danger mb-3">
            {dbErrors?.dbconnectid?.message}
          </div>
          <CustomButton
            className="w-100 mt-2 mb-2"
            type="submit"
            actionWord="Submit"
            isLoading={loading}
            disabled={loading}
          />
        </form>
      ) : (
        <>
          <CustomButton
            actionWord="Select a different database?"
            type="button"
            onSubmit={() => {
              restart();
            }}
            className="w-100 mt-2 mb-2"
          />
        </>
      )}
      {showTables && managePanelState.selectedTable === null ? (
        <>
          <CustomButton
            type="button"
            actionWord="Delete Database"
            className="w-100 mt-2 mb-2 btn-danger"
            onSubmit={() => {
              setModal({
                modalMsg: "Are you sure you want to delete this database?",
                modalBtnActionName: "Delete",
                modalAction: () => {
                  // TODO: delete database and remove connection string from connections
                  console.log("Delete Database " + managePanelState.selectedDB);
                },
              });
            }}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          />
          <form onSubmit={tableHandleSubmit(tableOnSubmit)} className="p-2">
            <Table
              data={managePanelState.tablesInSelectedDB.map((table) => {
                return {
                  Select: (
                    <RadioButton
                      register={tableRegister}
                      value={table.table_name}
                      registerGroupName="tableSelection"
                    />
                  ),
                  ...table,
                  Delete: (
                    <CustomButton
                      type="button"
                      actionWord="Delete"
                      className="btn-danger"
                      onSubmit={() => {
                        setModal({
                          modalMsg: `Are you sure you want to delete ${table.table_name}?`,
                          modalBtnActionName: "Delete",
                          modalAction: () => {
                            // TODO: delete table from database
                            console.log("Delete " + table.table_name);
                          },
                        });
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    />
                  ),
                };
              })}
              tableHeader="Select a Table..."
            />
            <div className="text-danger mb-3">
              {tableErrors?.tableselection?.message}
            </div>
            <CustomButton
              className="w-100 mt-2 mb-2"
              type="submit"
              actionWord="Submit"
              isLoading={loading}
              disabled={loading}
            />
          </form>
        </>
      ) : (
        <>
          {managePanelState.selectedTable !== null ? (
            <CustomButton
              actionWord="Select a different table?"
              type="button"
              onSubmit={() => {
                setShowTableInfo(false);
                setShowTables(true);
                setManagePanelState({
                  ...managePanelState,
                  selectedTable: null,
                  tableInfo: null,
                });
              }}
              className="w-100 mt-2 mb-2"
            />
          ) : (
            ""
          )}
        </>
      )}
      {showTableInfo ? (
        <>
          <Table
            data={managePanelState.tableInfo.map((column, index) => {
              return {
                ...column,
                Update: (
                  <CustomButton
                    type="button"
                    actionWord="Update"
                    className="btn-primary"
                    onSubmit={() => {
                      setModal({
                        modalMsg: (
                          <ColumnNameUpdateForm
                            ref={updateColumnNameRef}
                            column={column}
                          />
                        ),
                        modalBtnActionName: "Update",
                        modalAction: () => {
                          // TODO: update column name
                          console.log(
                            "Update " +
                              column.column_name +
                              " to " +
                              getNewColumnName()
                          );
                        },
                      });
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  />
                ),
                Delete: (
                  <CustomButton
                    type="button"
                    actionWord="Delete"
                    className="btn-danger"
                    onSubmit={() => {
                      setModal({
                        modalMsg: `Are you sure you want to delete ${column.column_name} column?`,
                        modalBtnActionName: "Delete",
                        modalAction: () => {
                          // TODO: delete column from table
                          console.log("Delete " + column.column_name);
                        },
                      });
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  />
                ),
              };
            })}
            tableHeader="Table Column Information"
          />

          <section className="border border-5 p-2 d-flex justify-content-center align-items-center">
            <CustomButton
              type="button"
              actionWord="Update Table Name"
              onSubmit={() => {
                setModal({
                  modalMsg: (
                    <TableNameUpdateForm
                      ref={updateTableNameRef}
                      table={managePanelState.selectedTable}
                    />
                  ),
                  modalBtnActionName: "Update",
                  modalAction: () => {
                    // TODO: update table name
                    console.log(
                      "Update " +
                        managePanelState.selectedTable +
                        " to " +
                        getNewTableName()
                    );
                  },
                });
              }}
              className="btn-danger ms-2 w-100"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            />
          </section>

          <CustomButton
            type="button"
            actionWord="Restart"
            onSubmit={() => {
              restart();
            }}
            className="w-100 mt-2 mb-2"
          />
        </>
      ) : (
        ""
      )}
    </Page>
  );
};

export default ManagePanel;
