import ConnectionForm from "../interaction/form/ConnectionForm";
import Page from "../bootstrap/Page";
import ManageViewTable from "../bootstrap/ManageViewTable";
const ConnectionView = ({
  setPanel,
  connections,
  setConnectionsState,
  setModal,
}) => {
  return (
    <Page>
      <ConnectionForm
        setPanel={setPanel}
        setConnectionsState={setConnectionsState}
      />
      <ManageViewTable
        data={connections}
        setData={setConnectionsState}
        tableHeader="Manage Connections"
        setModal={setModal}
        tableType="manageDBConnections"
      />
    </Page>
  );
};
export default ConnectionView;
