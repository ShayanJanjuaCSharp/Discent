import mysql from 'mysql2/promise'
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(req) {
    const bakery = await cookies();
    const c = await req.json();
    const uID = await bakery.get("user").value;
    var conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "shayan",
        database: "css",
        port: 3306
    })
    try{
        const [results, fields] = await conn.query("INSERT INTO dm ( courseName, teacher, learner) VALUES (?,?,?)", [c.name, c.teacher, uID]+";");
        return NextResponse.json({type:'success',content:cID});
    }catch(e){
        return NextResponse.json({type:'error',content:e.message});
    }
}