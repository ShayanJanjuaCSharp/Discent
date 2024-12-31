'use client'
import { useEffect } from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import { Badge, Box, Container, Divider, Rating, Stack, SvgIcon, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import MessageSharpIcon from '@mui/icons-material/MessageSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useRouter } from "next/navigation";
import Grid from '@mui/material/Grid2';


export default function Home() {
    const [username, setuser] = useState({});
    const [userExist, setUE] = useState(false);
    const [notifExists, setNE] = useState(false);
    const [numOfNotifs, setNoN] = useState(0);

    useEffect(() => {
        const checkNotifs = async () => {
        const response = await fetch('/api/homePageStart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (!response.ok) console.log('Failed to fetch notifications');
    
        const results = await response.json();
        const type = results.type;
        console.log("type : " + type);
        console.log("content : " + results.content);
        if (type === 'notLoggedIn') setuser("404");
        if (type === 'error') console.log(results.content);
        else{
            const resultarr = results.content.split(",");
            setuser(resultarr[2]);
            setUE(true);
            if(resultarr[0] == "true"){
                setNE(true);
                setNoN(resultarr[1]);
            }else{
                setNE(false);
            }
        }
        };
        checkNotifs();
    },[]
    )
return (
    


);
}
