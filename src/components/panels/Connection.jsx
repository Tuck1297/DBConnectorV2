import ConnectionForm from "../interaction/form/ConnectionForm";
import Page from "../bootstrap/Page";
import { useContext } from "react";
import { ConnectionsContext } from "../context/ConnectionsContext";
import Table from "../tables/Table";
import CustomButton from "../interaction/inputs/CustomButton";
const ConnectionView = ({ setPanel, setModal }) => {
  const { connectionsData, setConnectionsData } =
    useContext(ConnectionsContext);
  return (
    <Page>
      <ConnectionForm setPanel={setPanel} />
      <Table
        data={connectionsData.map((connection) => {
          return {
            ...connection,
            Delete: (
              <CustomButton
                className="btn-danger"
                type="button"
                actionWord="Delete"
                onSubmit={() => {
                  console.log("Delete Connection. ID: " + connection.id);
                  // TODO: complete this functionality for deleteing a database connection
                  // setModal
                  // if delete button on modal clicked then delete connection
                  // and remove the related data from connectionsData
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
