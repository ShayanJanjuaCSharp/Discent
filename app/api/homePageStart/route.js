import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req){

    const bakery = await cookies();
    const id = await bakery.get("uID");
    if(!id) return NextResponse.json({type:'error',content:'no id'});
    id = id.value;
    console.log("id : " + id);
    var mysql = require('mysql');
    var conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "css",
      port: 3306
    })
    
    conn.connect(function(err) {
      if (err) {
        console.error(id + ' had error connecting: ' + err);
        return NextResponse.json({
          type  : 'error',
          content: err
        })
      }
      console.log('connected user : ' + id );
    });

    conn.query('SELECT * FROM notif WHERE id = ' + id, function (error, results, fields) {
      if (error) {
        return NextResponse.json({
          type: 'error',
          content:error
        })
      }
      else {
        if(results.length > 0) notifExists = true;
        else notifExists = false;
        numOfNotifs = results.length;
        return NextResponse.json({
          type:'notif',
          content:notifExists +","+ numOfNotifs,
        })
      }
    });
  }