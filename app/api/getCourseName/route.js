import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function GET(req){

    const bakery = await cookies();
    let course = await bakery.get("course");
    course = course.value;
    return NextResponse.json({
        name: course
    });

}