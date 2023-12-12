import Page from "../bootstrap/Page";
import ExecuteForm from "../interaction/form/ExecuteForm";
const ExecuteView = ({connections}) => {
  return (
    <Page>
      <h1 className="text-center">Execute Query(s)</h1>
      <ExecuteForm connections={connections}/>
    </Page>
  );
};
export default ExecuteView;
