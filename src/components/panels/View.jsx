import Page from "../bootstrap/Page";
import ManageViewTable from "../bootstrap/ManageViewTable";

const testData = [
  {id: 1, name: "test1", description: "test1 desc"},
  {id: 2, name: "test2", description: "test2 desc"},
  {id: 3, name: "test3", description: "test3 desc"},
  {id: 4, name: "test4", description: "test4 desc"},
  {id: 5, name: "test5", description: "test5 desc"},
]
const DataView = ({setModal}) => {
  return (
    <Page>
      <h1 className="text-center">View Selected Data</h1>
      <ManageViewTable data={testData} tableHeader="Test Data" setModal={setModal}/>
    </Page>
  );
};
export default DataView;
