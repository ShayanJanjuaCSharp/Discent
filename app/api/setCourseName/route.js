import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(req){

    const bakery = await cookies();
    const c = await req.json();
    const cname = c.name;
    let course = await bakery.set("course", cname);
}