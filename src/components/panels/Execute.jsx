import Page from "../bootstrap/Page";
import ExecuteForm from "../interaction/form/ExecuteForm";
const ExecuteView = () => {
  return (
    <Page>
      <h1 className="text-center">Execute Query</h1>
      <ExecuteForm/>
    </Page>
  );
};
export default ExecuteView;
