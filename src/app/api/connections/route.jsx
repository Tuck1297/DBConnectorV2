// api/connections

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../server/auth";
import { dbConnectionManagement } from "@/server/api/db-connection-management";
import { dbCmdExecute } from "@/server/api/db-cmd-execute";
export async function GET(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const result = await dbConnectionManagement.getAll(session.user.id);
    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const connectObj = await request.json();
    let connectResult = await dbCmdExecute.testConnection(connectObj);
    if (!connectResult) {
      return NextResponse.json(
        { message: "Connection failed" },
        { status: 400 }
      );
    }
    await dbConnectionManagement.create(connectObj, session.user.id);

    return NextResponse.json(
      { message: "Connection created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
export async function PUT(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const connectObj = await request.json();
    let result = await dbConnectionManagement.update(connectObj);
    if (result) {
      return NextResponse.json(
        { message: "Connection updated successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Connection could not be updated" },
      { status: 400 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
export async function DELETE(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const deleteId = await request.json();
    let result = await dbConnectionManagement.delete(deleteId);
    if (result) {
      return NextResponse.json(
        { message: "Connection deleted successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Connection could not be deleted" },
      { status: 400 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
