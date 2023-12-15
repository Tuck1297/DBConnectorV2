// api/tables

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../server/auth";
import { dbCmdExecute } from "@/server/api/db-cmd-execute";
import { dbConnectionManagement } from "@/server/api/db-connection-management";

export async function GET(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const dbId = context.params.dbId;
    let connectionObj = await dbConnectionManagement.getConnection(dbId);
    let tables = await dbCmdExecute.getTables(connectionObj, session.user.id);
    return NextResponse.json(tables);
  } catch (error) {
    return errorHandler(error);
  }
}
