// api/table_col

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../server/auth";
import { db } from "@/server/api/db";
import { dbCmdExecute } from "@/server/api/db-cmd-execute";
import { dbConnectionManagement } from "@/server/api/db-connection-management";

export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true);
    return NextResponse.json("Hello from the server! - api/table_col");
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true);
    // get table name and column name
    const { tableName, colName } = await request.json();
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    // get table name and column name
    const { tableName, colName } = await request.json();
    // get current user info
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
    // delete column from table
    await dbCmdExecute.deleteTableColumn(colName, tableName, connectionInfo);
    return NextResponse.json({message: "Column deleted successfully!"}, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
