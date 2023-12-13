import ConnectionForm from "../interaction/form/ConnectionForm";
import CenterElement from "../bootstrap/CenterElement";
import Page from "../bootstrap/Page";
import ManageViewTable from "../bootstrap/ManageViewTable";
const ConnectionView = ({setPanel, connections, setConnectionsState}) => {
  return (
    <Page>
      <ConnectionForm setPanel={setPanel} setConnectionsState={setConnectionsState} />
      <ManageViewTable data={connections} tableHeader="Manage Connections"/>
    </Page>
  );
};
export default ConnectionView;
