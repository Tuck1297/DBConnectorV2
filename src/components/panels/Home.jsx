import Page from "../bootstrap/Page";
import DatabaseIcon from "../icons/Database";
const HomeView = () => {
  return (
    <Page>
      <h1 className="text-center">Home</h1>
      <DatabaseIcon className="d-flex w-100" size="40" />
      <p className="position-relative"></p>
    </Page>
  );
};

export default HomeView;
