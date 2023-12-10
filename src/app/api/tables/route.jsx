// api/tables

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";

export async function GET(request, context) {
    try {
        await apiSetup(request, true);
        return NextResponse.json("Hello from the server! - api/tables");
    } catch (error) {
        errorHandler(error);
    }
}