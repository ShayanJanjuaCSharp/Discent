import { cookies } from "next/headers";

export async function GET() {
    const bakery = await cookies();
    const target = await bakery.get("target");
    return NextResponse.json({ target: target.value });
}