// api/table

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../server/auth";
import { dbCmdExecute } from "@/server/api/db-cmd-execute";
import { dbConnectionManagement } from "@/server/api/db-connection-management";
import { db } from "@/server/api/db";

export async function GET(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true);
    return NextResponse.json("Hello from the server! - api/table");
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true);
    return NextResponse.json("Hello from the server! - api/table");
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true);
    return NextResponse.json("Hello from the server! - api/table");
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const tableName = await request.json();
    // get current user information
    const currUser = await db.User.findOne({
      where: {
        id: session.user.id,
      },
      raw: true,
    });
    // extract current db interacting id
    const currDBInteracting = currUser.current_db_interacting;
    // use db connection id to retrieve connection info
    const connectionInfo = await dbConnectionManagement.getConnection(
      currDBInteracting
    );
    // delete table
    await dbCmdExecute.deleteTable(tableName, connectionInfo);
    return NextResponse.json("Table Deleted Successfully", { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
