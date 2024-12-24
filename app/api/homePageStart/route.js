import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req){

    const bakery = await cookies();
    let id = await bakery.set("uID", '1');
    id = await bakery.get("uID").value;
   // if(!id) return NextResponse.json({type:'error',content:'no id'});
    //id = id.value;
    console.log("id : " + id);
    var mysql = require('mysql');
    var conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "css",
      port: 3306
    })
    const connPromise = new Promise((resolve, reject) => {
      conn.connect(function(err) {
        if (err) {
          console.error(id + ' had error connecting: ' + err);
          return NextResponse.json({
            type  : 'error',
            content: err
          })
          reject();
        }
        console.log('connected user : ' + id );
        resolve(conn);
      });
    })
    
    const queryPromise = new Promise((resolve, reject) => {
      conn.query('SELECT * FROM notif WHERE id = ' + id, function (error, results, fields) {
        if (error) {
          return NextResponse.json({
            type: 'error',
            content:error
          })
          reject();
        }
        else {
          if(results.length > 0) notifExists = true;
          else notifExists = false;
          numOfNotifs = results.length;
          return NextResponse.json({
            type:'notif',
            content:notifExists +","+ numOfNotifs,
          })
          resolve();
        }
      });
    })
    
  }