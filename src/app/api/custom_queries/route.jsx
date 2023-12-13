// api/custom_queries

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../server/auth";
import { dbCmdExecute } from "@/server/api/db-cmd-execute";
import { db } from "@/server/api/db";
import { dbConnectionManagement } from "@/server/api/db-connection-management";

export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const queries = await request.json();
    const currUser = await db.User.findOne({
      where: {
        id: session.user.id,
      },
      raw: true,
    });
    const currDBInteracting = currUser.current_db_interacting;
    await dbConnectionManagement.updateUserCurrentInteracting(
      session.user.id,
      queries.radioBtn
    );
    const connectionInfo = await dbConnectionManagement.getConnection(
      currDBInteracting
    );
    const result = await dbCmdExecute.executeCustomQueries(
      queries,
      connectionInfo
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
