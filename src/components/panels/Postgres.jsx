import Page from "../bootstrap/Page";
const PostgresView = () => {
  return (
    <Page>
      <h1 className="text-center">Postgres</h1>
      <article className="border border-4 m-4">
        <h5 className="text-center">12/16/2023 Entry</h5>
        <p className="p-1">
          To delete a database in postgresql it is advised to connect to a
          different database on the same connection and then execute the
          following command: ```DROP DATABASE database_name;```. This is because
          you cannot delete a database that you are connected to. Here is the
          link to the documentation:
          <br></br>
          <a href="https://www.postgresql.org/docs/9.1/sql-dropdatabase.html">
            https://www.postgresql.org/docs/9.1/sql-dropdatabase.html
          </a>
          <br></br>
          <a href="https://stackoverflow.com/questions/36502401/postgres-drop-database-error-pq-cannot-drop-the-currently-open-database">
            StackOverflow Link
          </a>
        </p>
      </article>
    </Page>
  );
};

export default PostgresView;
