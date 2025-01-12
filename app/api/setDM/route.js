import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(req){

    const bakery = await cookies();
    const c = await req.json();
    const cID = c.convoID;
    let course = await bakery.set("DM", cID);
    return NextResponse.json({type:'success',content:course.value});
}