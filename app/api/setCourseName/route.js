import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(req){

    const bakery = await cookies();
    //const c = await req.json();
    //const cname = c.name;
    //const teach    = c.teacher;
    //let course = await bakery.set("course", cname + "," + teach);
    let course = await bakery.set("course","fun,adrian");
    return NextResponse.json({type:'success',content:course.value});
}