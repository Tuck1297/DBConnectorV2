"use client";
import Page from "../bootstrap/Page";
import TextArea from "../Interaction/inputs/Textarea";
import EventDropdown from "../Interaction/inputs/EventDropdown";
import possiblePostgresQueries from "../../../public/examplePostgresQueries.json";
import possiblePostgresDatatypes from "../../../public/postgresTableDatatypes.json";
import possiblePostgresAggregates from "../../../public/postgresAggregates.json";
import { useState } from "react";
import Table from "../bootstrap/Table";
const BuildView = () => {
  const [exampleQueryData, setExampleQueryData] = useState(
    possiblePostgresQueries["SELECT"]
  );
  const [query, setQuery] = useState(
    exampleQueryData.exampleQueries.join("\n \n")
  );
  return (
    <div>
      <Page>
        <section className="p-3">
          <h1 className="text-center mb-4">Query Builder</h1>
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
          <TextArea className="mt-3" placeholder="Create your Query Here..." />
          <h2 className="fs-4 text-center w-100 mt-3">
            Additional Query Information
          </h2>
          {exampleQueryData.desc ? (
            <p className="p-3 bg-light fs-5">{exampleQueryData.desc}</p>
          ) : (
            <></>
          )}
          {exampleQueryData.desc2 ? (
            <p className="p-3 bg-light fs-5">{exampleQueryData.desc2}</p>
          ) : (
            <></>
          )}
          <Table tableData={possiblePostgresDatatypes} tableHeader="Table DataTypes"/>
          <Table tableData={possiblePostgresAggregates} tableHeader="Aggregate Functions"/>
        </section>
      </Page>
    </div>
  );
};

export default BuildView;
