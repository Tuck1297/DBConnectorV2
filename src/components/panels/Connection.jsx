import ConnectionForm from "../interaction/form/ConnectionForm";
import CenterElement from "../bootstrap/CenterElement";
import Page from "../bootstrap/Page";
import Table from "../bootstrap/Table";
const ConnectionView = ({setPanel, connections}) => {
  return (
    <Page>
      <ConnectionForm setPanel={setPanel} />
      <Table tableData={connections} tableHeader="Existing Connections"/>
    </Page>
  );
};
export default ConnectionView;
