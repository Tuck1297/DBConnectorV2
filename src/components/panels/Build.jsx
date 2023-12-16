"use client";
import Page from "../bootstrap/Page";
import TextArea from "../interaction/inputs/Textarea";
import EventDropdown from "../interaction/inputs/EventDropdown";
import possiblePostgresQueries from "../../../public/examplePostgresQueries.json";
import possiblePostgresDatatypes from "../../../public/postgresTableDatatypes.json";
import possiblePostgresAggregates from "../../../public/postgresAggregates.json";
import { useState, useContext } from "react";
import Table from "../tables/Table";
import { QueryBuilderContext } from "../context/QueryBuilderContext";
import TablesViewByDB from "../bootstrap/TablesViewByDB";

const BuildView = () => {
  const [exampleQueryData, setExampleQueryData] = useState(
    possiblePostgresQueries["SELECT"]
  );
  const [query, setQuery] = useState(
    exampleQueryData.exampleQueries.join("\n \n")
  );
  const { builderData, setBuilderData } = useContext(QueryBuilderContext);
  return (
    <div>
      <Page>
        <section className="p-3">
          <h1 className="text-center mb-4">Query Builder ~ PostgresSQL</h1>
          <EventDropdown
            initial="SELECT"
            elements={Object.keys(possiblePostgresQueries)}
            title="Possible Postgres Queries"
            externalEvent={(queryType) => {
              setExampleQueryData(possiblePostgresQueries[queryType]);
              setQuery(
                possiblePostgresQueries[queryType].exampleQueries.join("\n \n")
              );
            }}
          />
          <TextArea placeholder={query} disabled={true} />
          <TextArea
            className="mt-3"
            placeholder="Create your Query Here..."
            onChange={(e) => setBuilderData(e.target.value)}
            value={builderData}
          />
          <h2 className="fs-4 text-center w-100 mt-3">
            Additional Query Information
          </h2>
          {exampleQueryData.desc ? (
            <p
              className="p-3 bg-light fs-5"
              dangerouslySetInnerHTML={{
                __html: exampleQueryData.desc.replaceAll("%%%%", "<br>"),
              }}
            ></p>
          ) : (
            <></>
          )}
          {exampleQueryData.desc2 ? (
            <p
              className="p-3 bg-light fs-5"
              dangerouslySetInnerHTML={{
                __html: exampleQueryData.desc2.replaceAll("%%%%", "<br>"),
              }}
            ></p>
          ) : (
            <></>
          )}
          <TablesViewByDB/>
          <Table
            data={possiblePostgresDatatypes}
            tableHeader="Table DataTypes"
          />
          <Table
            data={possiblePostgresAggregates}
            tableHeader="Aggregate Functions"
          />
        </section>
      </Page>
    </div>
  );
};

export default BuildView;
