import { runMain } from "../../../node/main"

export async function POST(req: Request) {

    const body = await req.json();
    const { port } = body;
    console.log("Received upload request for port:", port);
    const result = await runMain(port);
    if (result) {
        return new Response(
            JSON.stringify({result: "Upload successful" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }
    else {
        return new Response(
            JSON.stringify({ error: "Upload failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}