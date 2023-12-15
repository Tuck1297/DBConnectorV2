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
import Modal from "./bootstrap/Modal";
import { useState, useContext, useEffect } from "react";
import { ConnectionsContext } from "./context/ConnectionsContext";
const DBPage = ({ connections }) => {
  const [panel, setPanel] = useState("home");
  const [modal, setModal] = useState({
    modalMsg: "Template Message",
    modalBtnActionName: "Submit",
    modalAction: () => {
      console.log("Modal Action");
    },
  });
  const { connectionsData, setConnectionsData } = useContext(ConnectionsContext);

  useEffect(() => {
    setConnectionsData(connections);
  }, [])
  return (
    <>
      <Modal
        message={modal.modalMsg}
        btnActionName={modal.modalBtnActionName}
        btnAction={modal.modalAction}
      />
      <Sidebar setPanel={setPanel}>
        {panel === "home" && <HomePanel />}
        {panel === "view" && <ViewPanel setModal={setModal}/>}
        {panel === "execute" && <ExecutePanel/>}
        {panel === "build" && <BuildPanel />}
        {panel === "connection" && (
          <ConnectionPanel
            setPanel={setPanel}
            setModal={setModal}
          />
        )}
        {panel === "postgres" && <PostgresPanel />}
        {panel === "sql" && <SqlPanel />}
        {panel === "mongodb" && <MongodbPanel />}
      </Sidebar>
    </>
  );
};

export default DBPage;
