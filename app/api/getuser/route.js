import {cookies} from 'next/headers'

export async function GET(req) {
    const bakery = await cookies();
    const user = await bakery.get("user").value;
    return NextResponse.json({ type: 'success', content: user});
}