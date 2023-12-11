// api/table_row

import { NextResponse } from "next/server";
import { apiSetup } from "@/server/api/api-setup";
import { errorHandler } from "@/server/api/error-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../server/auth";

export async function POST(request, context) {
    try {
        const session = await getServerSession(authOptions);
        await apiSetup(request, true);
        return NextResponse.json("Hello from the server! - api/table_row");
    } catch (error) {
        return errorHandler(error);
    }
}

export async function PUT(request, context) {
    try {
        const session = await getServerSession(authOptions);
        await apiSetup(request, true);
        return NextResponse.json("Hello from the server! - api/table_row");
    } catch (error) {
        return errorHandler(error);
    }
}

export async function DELETE(request, context) {
    try {
        const session = await getServerSession(authOptions);
        await apiSetup(request, true);
        return NextResponse.json("Hello from the server! - api/table_row");
    } catch (error) {
        return errorHandler(error);
    }
}