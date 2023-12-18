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
      <article className="border border-4 m-4">
        <h5 className="text-center">12/17/2023 Entry</h5>
        <p className="p-1">
          I ran into a problem today when I attempted to migrate my
          stateoutlines from my local database to my remote database. I was
          getting the following error:
          <b>
            original: error: could not parse geometry: error parsing EWKB hex:
            wkb: unsupported type: 536870924
          </b>
          This was not the most ideal problem, but I had an idea what the
          problem was. You see this problem was only happening on four of the 51
          states I was migrating (51 because of DC). These states where Florida,
          California, New Jersey and Alaska which all where states that I edited
          in one way or another in QGIS. It turns out they all where all
          MultiSurfaces instead of MultiPolygons. So after a bit more digging I
          came to the conclusion that this error was popping up due to my local
          database having a newer version of PostGIS then my production
          database. Being I could not update my remote database to be equal to
          my local database I had to find a way to convert the MultiSurfaces to
          MultiPolygons. I searched the PostGIS documentation and found the link
          below to the exact query that I needed to run. It was the following:
          <br></br>
          <b>
            SELECT ST_CollectionExtract(ST_Collect(geometry), 3) as multipolygon
            FROM stateoutlines WHERE state = 'Florida';
          </b>
          <br></br>
          Simply this query will take the multisurface geometry I have in my new
          database and update it to a multipolygon geometry. One other query
          that helped me out in this process was to figure out what kind of
          geometry that I had for each state in my database. This is actually
          how I discovered that my the four states where multisurfaces instead
          of the expected multipolygons. The query was:
          <br></br>
          <b>
            SELECT state, ST_GeometryType(geometry) AS polygon_type FROM
            stateoutlines order by polygon_type;
          </b>
          <br></br>
          <a href="https://postgis.net/docs/manual-1.5/ST_CollectionExtract.html">
            PostGIS Documentation
          </a>
          <br></br>
          <a href="https://postgis.net/docs/ST_CollectionExtract.html">
            PostGIS Documentation 2
          </a>
        </p>
      </article>
    </Page>
  );
};

export default PostgresView;
