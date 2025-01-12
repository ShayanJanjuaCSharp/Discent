import { NextResponse } from "next/server";

export async function POST(req){
    const nodemailer = require("nodemailer");
    const recieve = await req.json();
    const code = recieve.code;
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "thetunersdev@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
    }
    })

    try{
        const info = await transporter.sendMail({
            from: '"Shay from Discent " <thetunersdev@gmail.com>',
            to: recieve.email, 
            subject: "Your Verification code ", 
            text: "Your code is" + code, 
            html: "Your code is" + code,
    })
    return NextResponse.json({success:true});
    }
    catch(e){
        console.log(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
    
}