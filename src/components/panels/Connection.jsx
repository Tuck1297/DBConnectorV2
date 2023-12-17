import ConnectionForm from "../interaction/form/ConnectionForm";
import Page from "../bootstrap/Page";
import { useContext, useState } from "react";
import { ConnectionsContext } from "../context/ConnectionsContext";
import Table from "../tables/Table";
import CustomButton from "../interaction/inputs/CustomButton";
import { alertService } from "../../services/alertService";
import { connectService } from "@/services/connectService";
const ConnectionView = ({ setPanel, setModal }) => {
  const { connectionsData, setConnectionsData } =
    useContext(ConnectionsContext);
  const [deleteConnectionState, setDeleteConnectionState] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  function removeConnection(index) {
    const newData = [...connectionsData];
    newData.splice(index, 1);
    setConnectionsData(newData);
  }
  return (
    <Page>
      <ConnectionForm setPanel={setPanel} />
      <Table
        data={connectionsData.map((connection, index) => {
          return {
            ...connection,
            Delete: (
              <CustomButton
                className="btn-danger"
                type="button"
                actionWord="Delete"
                isLoading={
                  deleteLoading && deleteConnectionState === index
                }
                disabled={deleteLoading}
                onSubmit={() => {
                  // console.log("Delete Connection. ID: " + connection.id);
                  // TODO: complete this functionality for deleteing a database connection
                  // setModal
                  // if delete button on modal clicked then delete connection
                  // and remove the related data from connectionsData
                  setModal({
                    modalMsg: "Are you sure you want to delete this connction?",
                    modalBtnActionName: "Delete",
                    modalAction: async () => {
                      setDeleteConnectionState(index);
                      setDeleteLoading(true);
                      await connectService
                        .delete(connection.id)
                        .then((res) => {
                          setDeleteConnectionState(null);
                          setDeleteLoading(false);
                          removeConnection(index);
                          alertService.success("Connection Deleted");
                        })
                        .catch((err) => {
                          setDeleteConnectionState(null);
                          setDeleteLoading(false);
                          alertService.error(err);
                        });
                    }
                  });
                }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              />
            ),
          };
        })}
        tableHeader="Currently saved Database Connections"
      />
    </Page>
  );
};
export default ConnectionView;
