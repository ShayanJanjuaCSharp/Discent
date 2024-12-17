import { NextResponse } from "next/server";

export async function POST(req){

    const id = req.text(0);

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
        return;
      }
      console.log('connected user : ' + id );
    });

    conn.query('SELECT * FROM notif WHERE id = ' + id, function (error, results, fields) {
      if (error) {
        return NextResponse.json({
          type: error,
          content:err
        })
      };
      if(results.length > 0){
        notifExists = true;
        numOfNotifs = results.length;
        return NextResponse.json({
          type:notif,
          content:notifExists +","+ numOfNotifs,
        })
      }
    });
  }