import { getPort } from "@/node/getPort"
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const ports = await getPort();
        return NextResponse.json(ports);
    } 
    catch (error) {
        console.error("GET Workspace Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}