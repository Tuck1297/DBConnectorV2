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
import ColumnNameUpdateForm from "../interaction/form/ColumnNameUpdateForm";
import TableNameUpdateForm from "../interaction/form/TableNameUpdateForm";
const ManagePanel = ({ setModal }) => {
  const { managePanelState, setManagePanelState } =
    useContext(ManagePanelContext);
  const { connectionsData, setConnectionsData } =
    useContext(ConnectionsContext);
  const [loading, setLoading] = useState(false);

  const [showDBs, setShowDBs] = useState(
    managePanelState.selectedDB === null ? true : false
  );
  const [showTables, setShowTables] = useState(
    managePanelState.selectedTable === null &&
      managePanelState.selectedDB !== null
      ? true
      : false
  );
  const [showTableInfo, setShowTableInfo] = useState(
    managePanelState.tableInfo === null ? false : true
  );
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  // function removeDBConnection(index) {
  //   const newData = [...connectionsData];
  //   newData.splice(index, 1);
  //   setConnectionsData(newData);
  // }

  function removeTable(index) {
    const newData = [...managePanelState.tablesInSelectedDB];
    newData.splice(index, 1);
    setManagePanelState({
      ...managePanelState,
      tablesInSelectedDB: newData,
    });
  }

  function removeColumn(index) {
    const newData = [...managePanelState.tableInfo];
    newData.splice(index, 1);
    setManagePanelState({
      ...managePanelState,
      tableInfo: newData,
    });
  }

  function updateTable(index, table) {
    const newData = [...managePanelState.tablesInSelectedDB];
    newData[index] = table;
    setManagePanelState({
      ...managePanelState,
      tablesInSelectedDB: newData,
    });
  }

  function updateColumn(index, column) {
    const newData = [...managePanelState.tableInfo];
    newData[index].column_name = column;
    setManagePanelState({
      ...managePanelState,
      tableInfo: newData,
    });
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
      <p>
        NOTE: This page is still under development. States are currently not all
        updated and updating table name as well as updating column names are
        currently also not operational.
      </p>
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
          {/* <CustomButton
            type="button"
            actionWord="Delete Database"
            className="w-100 mt-2 mb-2 btn-danger"
            disabled={deleteLoading}
            onSubmit={() => {
              setModal({
                modalMsg: "Are you sure you want to delete this database?",
                modalBtnActionName: "Delete",
                modalAction: async () => {
                  console.log("Delete Database " + managePanelState.selectedDB);
                  setDeleteLoading(true);
                  await dbConnectService.deleteDatabase(managePanelState.selectedDB)
                  .then((res) => {
                    alertService.success("Database Deleted Successfully");
                    removeDBConnection(connectionsData.findIndex((connection) => connection.id === managePanelState.selectedDB));
                    restart();
                    setDeleteLoading(false);
                  })
                  .catch((err) => {
                    alertService.error(err);
                    setDeleteLoading(false);
                  })
                },
              });
            }}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          /> */}
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
                      disabled={deleteLoading}
                      onSubmit={() => {
                        setModal({
                          modalMsg: `Are you sure you want to delete ${table.table_name}?`,
                          modalBtnActionName: "Delete",
                          modalAction: () => {
                            // console.log("Delete " + table.table_name);
                            setDeleteLoading(true);
                            dbConnectService
                              .deleteTable(table.table_name)
                              .then((res) => {
                                alertService.success(
                                  "Table Deleted Successfully"
                                );
                                removeTable(
                                  managePanelState.tablesInSelectedDB.findIndex(
                                    (table) =>
                                      table.table_name === table.table_name
                                  )
                                );
                                setDeleteLoading(false);
                              })
                              .catch((err) => {
                                alertService.error(err);
                                setDeleteLoading(false);
                              });
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
                        modalAction: async () => {
                          // console.log(
                          //   "Update " +
                          //     column.column_name +
                          //     " to " +
                          //     getNewColumnName()
                          // );
                          await dbConnectService
                            .updateTableCol(
                              getNewColumnName(),
                              column.column_name,
                              managePanelState.selectedTable
                            )
                            .then((res) => {
                              alertService.success(
                                "Column Updated Successfully"
                              );
                              updateColumn(index, getNewColumnName());
                            })
                            .catch((err) => {
                              alertService.error(err);
                            });
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
                    disabled={deleteLoading}
                    onSubmit={() => {
                      setModal({
                        modalMsg: `Are you sure you want to delete ${column.column_name} column?`,
                        modalBtnActionName: "Delete",
                        modalAction: () => {
                          // console.log("Delete " + column.column_name);
                          setDeleteLoading(true);
                          dbConnectService
                            .deleteTableColumn(
                              column.column_name,
                              managePanelState.selectedTable
                            )
                            .then((res) => {
                              alertService.success(
                                "Column Deleted Successfully"
                              );
                              removeColumn(
                                managePanelState.tableInfo.findIndex(
                                  (column) =>
                                    column.column_name === column.column_name
                                )
                              );
                              setDeleteLoading(false);
                            })
                            .catch((err) => {
                              alertService.error(err);
                              setDeleteLoading(false);
                            });
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
                    // console.log(
                    //   "Update " +
                    //     managePanelState.selectedTable +
                    //     " to " +
                    //     getNewTableName()
                    // );
                    dbConnectService
                      .updateTable(
                        getNewTableName(),
                        managePanelState.selectedTable
                      )
                      .then((res) => {
                        alertService.success("Table Updated Successfully");
                        setManagePanelState({
                          ...managePanelState,
                          selectedTable: getNewTableName(),
                        });
                      })
                      .catch((err) => {
                        alertService.error(err);
                      });
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
