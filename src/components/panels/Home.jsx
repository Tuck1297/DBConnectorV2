import Page from "../bootstrap/Page";
import DatabaseIcon from "../icons/Database";
const HomeView = () => {
  return (
    <Page>
      <DatabaseIcon className="d-flex w-100 mt-3" size="40" />
      <h1 className="text-center">Home</h1>
      <p className="ps-3 pe-3 mt-3">
        Hello and welcome to the my database connector 1000! This application is
        simply my ongoing project in learning how to connect to multiple
        different databases but abstract away the underlying logic that I would
        continually have to write for each type of database connection.
      </p>
      <p className="ps-3 pe-3">
        The current plan for this application is to not write any new code for
        connecting and interacting with any new databases until I use or
        interact with that database type constantly. Eventually I may launch the
        application into the cloud using ASP.net Azure and have it be a service
        that I can access from any device I have.
      </p>
      <p className="ps-3 pe-3">
        I'm starting implementation of this application with interaction with
        PostgreSQL databases. Specifically, with a PostgreSQL database that I
        have running on my local environment. Eventually I will integrate
        support for SQL, MongoDB, MariaDB and SQLite.
      </p>
      <p className="ps-3 pe-3">Until next time, happy querying!!!</p>
      <h5 className="ps-3">12/11/2023</h5>
    </Page>
  );
};

export default HomeView;
