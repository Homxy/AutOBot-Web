import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserSession } from '@/lib/session'; 


export async function POST(req: Request) {
    try {
        const session = await getUserSession();
        
        if (!session || !session.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, data } = body;

        if (!name || !data) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Check if the workspace name already exists for this specific user
        const existingWorkspace = await prisma.workspace.findFirst({
            where: {
                name: name,
                authorId: Number(session.id),
            },
        });

        if (existingWorkspace) {
            return NextResponse.json(
                { error: "A workspace with this name already exists" }, 
                { status: 409 } // 409 Conflict is the correct status for duplicates
            );
        }

        // 2. Create the new workspace if it doesn't exist
        const newWorkspace = await prisma.workspace.create({
            data: {
                name: name,
                data: data,
                authorId: Number(session.id),
            },
        });

        return NextResponse.json({ message: "Workspace created successfully" }, { status: 201 });
    }
    catch (error) {
        console.error("Workspace Creation Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getUserSession();

        if (!session || !session.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const workspaces = await prisma.workspace.findMany({
        where: {
            authorId: Number(session.id),
        },
        });

        return NextResponse.json(workspaces);
    } 
    catch (error) {
        console.error("GET Workspace Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

