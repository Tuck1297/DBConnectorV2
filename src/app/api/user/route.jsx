// api/user

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../server/auth";
import { dbConnectionManagement } from "@/server/api/db-connection-management";

export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);
    await apiSetup(request, true, session);
    const connectObj = await request.json();
    let result = await dbConnectionManagement.updateUserCurrentInteracting(
      connectObj.userId,
      connectObj.connectionId
    );
    if (result) {
      return NextResponse.json(
        { message: "User connection updated successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "User connection could not be updated" },
      { status: 400 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
