// api/table_row

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";

export async function POST(request, context) {
    try {
        await apiSetup(request, true);
        return NextResponse.json("Hello from the server! - api/table_row");
    } catch (error) {
        errorHandler(error);
    }
}

export async function PUT(request, context) {
    try {
        await apiSetup(request, true);
        return NextResponse.json("Hello from the server! - api/table_row");
    } catch (error) {
        errorHandler(error);
    }
}

export async function DELETE(request, context) {
    try {
        await apiSetup(request, true);
        return NextResponse.json("Hello from the server! - api/table_row");
    } catch (error) {
        errorHandler(error);
    }
}