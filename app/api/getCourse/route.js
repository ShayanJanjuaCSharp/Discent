import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import mysql from 'mysql2/promise'


export async function GET(req){

    const bakery = await cookies();
    let course = await bakery.get("course");
    course = course.value.split(",")[0];
    let teach = await bakery.get("course");
    teach = teach.value.split(",")[1];
    var conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.MYSQL_PASSWORD,
        database: "css",
        port: 3306
    })
    try{
        const [results, fields] = await conn.query('SELECT * FROM posts WHERE courseName = "' + course + '" AND teacher = "' + teach + '"');
        return NextResponse.json({
            type:'course',
            name: results[0].courseName,
            teacher: results[0].teacher,
            description: results[0].description,
            date: results[0].DatePosted,
            memberCount: results[0].memberCount,
        })
    }catch(e){
        return NextResponse.json({
            type:'error',
            content:e.message,
        })
    }
}