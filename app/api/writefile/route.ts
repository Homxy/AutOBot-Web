import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  const body = await request.json();
  const { content } = body as { content: string };

  const filePath = path.join(process.cwd(), "node/hello", "hello.ino");
  await fs.writeFile(filePath, content, "utf8");

  return new Response(
    JSON.stringify({ success: true, message: "File written successfully" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}