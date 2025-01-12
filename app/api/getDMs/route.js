import mysql from 'mysql2/promise'
import { NextResponse } from "next/server";

export async function  POST(req){
    const input = await req.json();
    var conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "shayan",
        database: "css",
        port: 3306
    })

    try{
        const [results, fields] = await conn.query("SELECT * FROM dm WHERE teacher = '" + input.name + "' OR learner = '" + input.name + "' ;");
        let send = '';
        results.forEach((r) => {
            if(r.learner == input.name){
                send = send + r.convoID + ',' + r.courseName + ',' + r.teacher + '`';
            }
            else{
                send = send + r.convoID + ',' + r.courseName + ',' + r.learner + '`';
            }
        })

        return NextResponse.json({
            type:'dms',
            content:send,
        })
    }catch(e){
        console.log("error:" + e);
        return NextResponse.json({
            type:'error',
            content:e.message,
        })
    }

}
