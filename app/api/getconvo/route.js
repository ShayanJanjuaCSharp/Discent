import mysql from 'mysql2/promise'
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function  POST(req){
    const bakery = await cookies();
    let course = await bakery.get("DM");
    const uID =await  bakery.get("user").value;
    const convoID = course.value;
    const target = '';
    console.log("convoID: " + convoID);
    var conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "shayan",
        database: "css",
        port: 3306
    })

    try{
        const [results, fields] = await conn.query("SELECT * FROM conversation WHERE ConvoID = '" + convoID + "' ;");
        let send = '';
        results.forEach((r) => {
            if(r.Speaker == uID){
                send = send + 'you' + ',' + r.Content + ',' + r.Time + '`';
            }
            else{
                send = send + r.Speaker + ',' + r.Content + ',' + r.Time + '`';
                target = r.Speaker
            }
        })
        console.log("send : " + send)
        const tr = await bakery.set("target", target)
        return NextResponse.json({
            type:'convo',
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
