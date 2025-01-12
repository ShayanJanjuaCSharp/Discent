import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import mysql from 'mysql2/promise'


export async function POST(req){
  const bakery = await cookies();
    const id = bakery.get("user").value;
    console.log(id);
    
    var conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "shayan",
      database: "css",
      port: 3306
    })
    try{
      const [results, fields] = await conn.query("SELECT * FROM notif WHERE username = '" + id + "';");
      let notifExists, numOfNotifs;
      if(results.length > 0) notifExists = true;
      else notifExists = false;
      numOfNotifs = results.length;
      return NextResponse.json({
        type:'notif',
        content:notifExists +","+ numOfNotifs + "," + id,
      })
    }catch(e){
      return NextResponse.json({
        type:'error',
        content:e.message,
      })
    }
}