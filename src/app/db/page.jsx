import { redirect } from "next/navigation";
import DBPage from "@/components/DBPage";
import { getServerSession } from "next-auth";
import {authOptions} from "../../server/auth";
import { dbConnectionManagement } from "@/server/api/db-connection-management";
import { db } from "@/server/api/db";

export default async function DatabasePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  if (!db.initialized) {
    await db.initialize();
  }
  let connections = await dbConnectionManagement.getAll(session.user.id);
  connections = JSON.parse(JSON.stringify(connections));
  return <DBPage connections={connections} />;
}