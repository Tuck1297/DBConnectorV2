// api/table_rows

import { NextResponse } from "next/server";

export async function GET(request, context) {
    return NextResponse.json("Hello from the server! - api/table_rows");
}