// api/test/connection

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";
import { dbCmdExecute } from "@/server/api/db-cmd-execute";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const connectObj = await request.json();
    const result = await dbCmdExecute.testConnection(connectObj);
    if (result) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.error("Connection failed.");
    }
  } catch (error) {
    return errorHandler(error);
  }
}
