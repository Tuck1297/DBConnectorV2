"use client";
import Page from "../bootstrap/Page";
import ExecuteForm from "../interaction/form/ExecuteForm";
import TablesViewByDB from "../bootstrap/TablesViewByDB";
const ExecuteView = () => {
  return (
    <Page>
      <h1 className="text-center">Execute Query(s)</h1>
      <ExecuteForm/>
      <TablesViewByDB/>
    </Page>
  );
};
export default ExecuteView;
