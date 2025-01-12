import mysql from 'mysql2/promise'
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
    const bakery = await cookies();
    let course = await bakery.get("DM");
    const convoID = course.value;
    const speaker = await bakery.get("user").value;
    const input = await req.json();
    var conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.MYSQL_PASSWORD,
        database: "css",
        port: 3306
    });

    try {
        const [results, fields] = await conn.query('INSERT INTO conversation (ConvoID, Speaker, Content, Time) VALUES (?,?,?,?)', [convoID, speaker, input.message, input.time]);
        return NextResponse.json({ type: 'success', content: 'Message sent' });
    } catch (e) {
        return NextResponse.json({ type: 'error', content: e.message });
    }
}