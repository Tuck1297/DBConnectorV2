// api/tables

import { NextResponse } from "next/server";

export async function GET(request, context) {
    return NextResponse.json("Hello from the server! - api/tables");
}