// api/table_col

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";

export async function POST(request, context) {
    try {
        await apiSetup(request, true);
        return NextResponse.json("Hello from the server! - api/table_col");
    } catch (error) {
        errorHandler(error);
    }
}

export async function PUT(request, context) {
    try {
        await apiSetup(request, true);
        return NextResponse.json("Hello from the server! - api/table_col");
    } catch (error) {
        errorHandler(error);
    }
}

export async function DELETE(request, context) {
    try {
        await apiSetup(request, true);
        return NextResponse.json("Hello from the server! - api/table_col");
    } catch (error) {
        errorHandler(error);
    }
}