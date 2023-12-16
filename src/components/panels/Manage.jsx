import Page from "../bootstrap/Page";
import { useState, useContext, useEffect } from "react";
import { ManagePanelContext } from "../context/ManagePanelContext";
import CustomButton from "../interaction/inputs/CustomButton";
import { ConnectionsContext } from "../context/ConnectionsContext";
import { set, useForm } from "react-hook-form";
import { authSchema } from "@/hooks/yupAuth";
import { dbConnectService } from "@/services/dbConnectService";
import { alertService } from "@/services/alertService";
import Table from "../tables/Table";
import RadioButton from "../interaction/inputs/RadioButton";
import TextBox from "../interaction/inputs/Textbox";
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
                  // console.log("Delete Database " + managePanelState.selectedDB);
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
          <CustomButton
            type="button"
            actionWord="Delete Table"
            className="w-100 btn-danger mt-2 mb-2"
            onSubmit={() => {
              setModal({
                modalMsg: "Are you sure you want to delete this table?",
                modalBtnActionName: "Delete",
                modalAction: () => {
                  // console.log("Delete Table " + managePanelState.selectedTable);
                  // TODO: complete deleteing a table from the database
                  // setLoading(true);
                  // dbConnectService
                  //   .deleteTable(managePanelState.selectedTable)
                  //   .then((res) => {
                  //     alertService.success(res);
                  //     setLoading(false);
                  //     restart();
                  //   })
                  //   .catch((err) => {
                  //     alertService.error(err);
                  //     setLoading(false);
                  //   });
                },
              });
            }}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          />
          {/* <p className="text-center fs-2">
            table information populated in forms with delete, update and other
            buttons and dropdowns and stuff {managePanelState.selectedTable}
          </p> */}
          <Table
            data={managePanelState.tableInfo.map((column, index) => {
              return {
                ...column,
                new_column_name: (
                  <input
                    className="form-control"
                    onChange={(e) => {
                      e.preventDefault();
                      setNewColName({
                        ...newColName,
                        [column.column_name]: e.target.value,
                      });
                    }}
                  ></input>
                ),
                Update: (
                  <CustomButton
                    type="button"
                    actionWord="Update"
                    className="btn-primary"
                    onSubmit={() => {
                      if (newColName[column.column_name] === undefined) {
                        alert(
                          "Please enter a new column name for " +
                            column.column_name
                        );
                        return;
                      }
                      setModal({
                        modalMsg: `Are you sure you want to update ${
                          column.column_name
                        } to ${newColName[column.column_name]}?`,
                        modalBtnActionName: "Update",
                        modalAction: () => {
                          console.log(
                            "Update " +
                              column.column_name +
                              " to " +
                              newColName[column.column_name]
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
            <input
            type="text"
            className="form-control"
            placeholder={managePanelState.selectedTable}
            />
            <CustomButton
              type="button"
              actionWord="Update Table Name"
              onSubmit={() => {
                console.log("Update Table Name");
              }}
              className="btn-danger ms-2"
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

/*
TODO: 
 - Need to create a new form that will explicitly work with manipulating column and table information
 TO IMPLEMENT IN NEW FORM
 1. Delete a Table - front end added
 2. Delete a Database - front end added
 3. Remove a column from a table - front end added
 4. Add a column to a table - keep this a custom query for now...
 5. update the name of a column in a table - front end added
 6. update the name of the table - front end added
 7. Insert one or many new rows into a table -- later
*/
