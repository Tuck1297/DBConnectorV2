"use client";
import Sidebar from "@/components/navigation/Sidebar";
import ConnectionPanel from "@/components/panels/Connection";
import BuildPanel from "@/components/panels/Build";
import ExecutePanel from "@/components/panels/Execute";
import HomePanel from "@/components/panels/Home";
import ViewPanel from "@/components/panels/View";
import PostgresPanel from "@/components/panels/Postgres";
import SqlPanel from "@/components/panels/Sql";
import MongodbPanel from "@/components/panels/Mongodb";
import { useState } from "react";
const DBPage = ({connections}) => {
  const [panel, setPanel] = useState("home");
  const [connectionsState, setConnectionsState] = useState(connections);
  return (
    <Sidebar setPanel={setPanel}>
      {panel === "home" && <HomePanel />}
      {panel === "view" && <ViewPanel />}
      {panel === "execute" && <ExecutePanel connections={connectionsState} />}
      {panel === "build" && <BuildPanel />}
      {panel === "connection" && <ConnectionPanel setPanel={setPanel} connections={connectionsState} setConnectionsState={setConnectionsState}/>}
      {panel === "postgres" && <PostgresPanel />}
      {panel === "sql" && <SqlPanel />}
      {panel === "mongodb" && <MongodbPanel />}
    </Sidebar>
  );
};

export default DBPage;
