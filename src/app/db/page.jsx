"use client";

import Sidebar from "@/components/navigation/Sidebar";
import ConnectionView from "@/components/panels/Connection";

export default function DatabasePage() {
  return (
    <>
      <Sidebar>
        <ConnectionView />
      </Sidebar>
    </>
  );
}
