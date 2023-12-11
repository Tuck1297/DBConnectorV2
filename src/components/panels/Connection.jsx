import ConnectionForm from "../interaction/form/ConnectionForm";
import CenterElement from "../bootstrap/CenterElement";
import Page from "../bootstrap/Page";
const ConnectionView = ({setPanel}) => {
  return (
    <Page>
      <ConnectionForm setPanel={setPanel} />
    </Page>
  );
};
export default ConnectionView;
