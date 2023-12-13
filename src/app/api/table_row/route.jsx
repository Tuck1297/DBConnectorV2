// api/table_row

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../server/auth";
import { dbConnectionManagement } from "@/server/api/db-connection-management";
import { db } from "@/server/api/db";
import { dbCmdExecute } from "@/server/api/db-cmd-execute";

export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    return NextResponse.json("Hello from the server! - api/table_row");
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const rowObj = await request.json();
    const currUser = await db.User.findOne({
      where: {
        id: session.user.id,
      },
      raw: true
    });
    const currDBInteracting = currUser.current_db_interacting;
    const connectionInfo = await dbConnectionManagement.getConnection(currDBInteracting);
    await dbCmdExecute.updateTableRow(rowObj.update, rowObj.old, connectionInfo);
    return NextResponse.json({ message: "Row updated successfully" }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const rowObj = await request.json();
    const currUser = await db.User.findOne({
      where: {
        id: session.user.id,
      },
      raw: true
    });
    const currDBInteracting = currUser.current_db_interacting;
    const connectionInfo = await dbConnectionManagement.getConnection(currDBInteracting);
    await dbCmdExecute.deleteTableRow(rowObj, connectionInfo);
    return NextResponse.json({ message: "Row deleted successfully" }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
