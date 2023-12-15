import ConnectionForm from "../interaction/form/ConnectionForm";
import Page from "../bootstrap/Page";
import ManageViewTable from "../bootstrap/ManageViewTable";
import { useContext } from "react";
import { ConnectionsContext } from "../context/ConnectionsContext";
const ConnectionView = ({
  setPanel,
  setModal,
}) => {
  const { connectionsData, setConnectionsData } = useContext(ConnectionsContext);
  return (
    <Page>
      <ConnectionForm
        setPanel={setPanel}
      />
      <ManageViewTable
        data={connectionsData}
        setData={setConnectionsData}
        tableHeader="Manage Connections"
        setModal={setModal}
        tableType="manageDBConnections"
      />
    </Page>
  );
};
export default ConnectionView;
