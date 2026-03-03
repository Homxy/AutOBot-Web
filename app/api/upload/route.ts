import { runMain } from "../../../node/code-uploader"

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { port } = body;
        console.log("Received upload request for port:", port);
        const result = await runMain(port);
        return new Response(
            JSON.stringify({ result: "Upload successful" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }
    catch (error) {
        return new Response(
            JSON.stringify({ error: "Upload failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}