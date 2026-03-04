import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: Promise<{ name: string }> }) {
    try {
        const { name } = await params;
        const { blocklyData } = await req.json();

        await prisma.workspace.update({
            where: { name: name },
            data: {
                data: blocklyData
            },
        });

        return NextResponse.json({ message: "save successful" });
    } catch (error) {
        console.error("save Error:", error);
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: Promise<{ name: string }> }) {

    try {
        const { name } = await params;

        const workspace = await prisma.workspace.findUnique({
            where: {
                name: name,
            }
        });

        return NextResponse.json(workspace);
    }
    catch (error) {
        console.error("GET Workspace Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ name: string }> }) {
    try {
        const { name } = await params;

        const deletedWorkspace = await prisma.workspace.delete({
            where: {
                name: name
            }
        });

        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
    }
    catch (error) {
        console.error("DELETE Workspace Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}