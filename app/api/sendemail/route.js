import { NextResponse } from "next/server";

export async function POST(req){
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "thetunersdev@gmail.com",
        pass: "fqrp syfd nuhz kgwg",
    }
    })

    try{
        const info = await transporter.sendMail({
            from: '"Shay from Discent " <thetunersdev@gmail.com>',
            to: "shayanishaqjanjua@gmail.com", 
            subject: "Your Verification code ", 
            text: "Your code is" + req.body.code, 
            html: "Your code is" + req.body.code
    })
    return NextResponse.json({success:true});
    }
    catch(e){
        console.log(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
    
}