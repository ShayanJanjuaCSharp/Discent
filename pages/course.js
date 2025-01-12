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
import { useSession, signIn, signOut } from "next-auth/react"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { red } from "@mui/material/colors";


export default function Home() {

const theme = createTheme({
palette: {
    ochre: {
    main: '#E3D026',
    light: '#E9DB5D',
    dark: '#A29415',
    contrastText: '#242105',
    },
},
});

const val = red[500];
const [notifExists, setNE] = useState(false);
const [numOfNotifs, setNoN] = useState(0);
const [uID, setuID] = useState("none"); 
const {data : session} = useSession();
const [course, setCourse] = useState({
});
const router = useRouter();

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

        if (type === 'error') console.log(results.content);
        else{
            const resultarr = results.content.split(",");
            if(resultarr[0] == "true"){
                setNE(true);
                setNoN(resultarr[1]);
            }else{
                setNE(false);
            }
        }
    };

    const getCourse = async () => {
        const set = await fetch('/api/setCourseName', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        const response = await fetch('/api/getCourse', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const results = await response.json();
        if (results.type === "error") console.log(results.content);
        else{
        const name = results.name;
        console.log(name);
        const teacher = results.teacher;
        console.log(teacher);       
        const desc = results.description;
        console.log("desc : " + desc);
        const date= results.date;
        const mc = results.memberCount;
        setCourse({name: name, teacher: teacher, desc: desc, date: date, mc: mc});
        }
    }
    getCourse();
    checkNotifs();
},[]
)
/*
console.log(session);
let ws;
if(ws){
    ws.onerror = ws.onopen = ws.onclose = ws.onmessage = null;
}

ws = new WebSocket("https://websocket-database-pinging-production.up.railway.app");

ws.onopen = () => {
    console.log("Connected TO WEBSOCKET SERVER");
    ws.send("Hello,start,connect");
}

ws.onmessage = (msg) =>{
    console.log(msg.data);
    ws.send("Hello, John")
}

ws.onclose = () => {
    console.log(msg.data);
}

ws.onclose = () => {
    ws = null;
}   */
const handleCourse = async (name, teacher) => {

}
    
return (
    <Box sx={{width:"100vw", height:"100vh"}} justifyContent={"space-around"}>
    <AppBar position="static"  color="ochre"  px={4} >
    <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} >
    <Typography >css</Typography>
    <Stack direction="row">
        <Button variant="text"><HomeRoundedIcon/></Button>
        <Button variant="text" onClick={() => router.push("/search") }><SearchSharpIcon/></Button>
        <Button variant="text"><MessageSharpIcon/></Button>
        <Badge badgeContent={numOfNotifs} color="primary">
        <Button variant="text">{(notifExists?<NotificationsSharpIcon/>:<NotificationsNoneSharpIcon/>)}</Button>
        </Badge>
        <Button variant="text"><AccountCircleIcon/></Button>
    </Stack>
    <Button><SettingsRoundedIcon/></Button>
    </Stack>
</AppBar>
<Stack direction="column" justifyItems={"space-around"} alignItems={"left"} spacing={2} sx={{ marginTop: "20px", marginLeft: "200px" }}>
    <Typography variant="h1" >{course.name}</Typography>
    <Typography variant="h4" >{course.teacher}</Typography>
    <Typography variant="body1" >{course.date}</Typography>
    <br/><br/>
    <Typography variant="body1" >{course.desc}</Typography>
    <Stack direction="row" spacing={2}>
    <Badge badgeContent={course.mc} color="success">
    <AccountCircleIcon sx ={{color:val}}/>
    </Badge>
    </Stack>
</Stack>
<Button onClick={() => handleCourse(course.name, course.teacher)}>Join</Button>
</Box>
);
}
