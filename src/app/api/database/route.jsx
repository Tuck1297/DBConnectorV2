// api/database

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../server/auth";
import { dbCmdExecute } from "@/server/api/db-cmd-execute";
import { dbConnectionManagement } from "@/server/api/db-connection-management";
export async function DELETE(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const dbId = await request.json();
    // use db connection id to retrieve connection info
    const connectionInfo = await dbConnectionManagement.getConnection(dbId);
    // delete database
    await dbCmdExecute.deleteDatabase(connectionInfo);
    // remove connection from connections table
    await dbConnectionManagement.delete(dbId);
    return NextResponse.json({ message: "Database deleted successfully." }, { status: 200 });
} catch (error) {
    return errorHandler(error);
  }
}