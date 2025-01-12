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


export default function Home() {
  const [notifExists, setNE] = useState(false);
  const [numOfNotifs, setNoN] = useState(0);
  const [uID, setuID] = useState("none"); 
  const [courses, setCourses] = useState([]);
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

const handleCourse = async (name, teacher)  => {
  const r = await fetch('/api/setCourseName', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name: name, teacher: teacher})
  })
  router.push("/course");
}

    
return (
  <Box sx={{width:"100vw", height:"100vh"}} justifyContent={"space-around"}>
  <AppBar position="static"  color="white"  px={4} >
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
  <Stack direction="column" justifyItems={"space-around"} alignItems={"center"} spacing={2} sx={{ marginTop: "20px" }}>
    <Stack direction="column" >
      {courses.map((course) => (
        <Button onClick={handleCourse(course.name, course.teacher)}>
          <Stack direction="column" justifyContent={"space-between"} alignItems={"center"}>
            <Typography>{course.name}</Typography>
            <Typography>taught by {course.teacher}</Typography>
            <Typography>{course.description}</Typography>
            <Stack direction="row">
              <Rating value={course.rating} readOnly/>
              <Badge badgeContent={course.memberCount} color="primary">
              <AccountCircleIcon/>
            </Badge>
            </Stack>
          </Stack>
          <Divider/>
        </Button>
      ))}
    </Stack>
  </Stack>
  </Box>
    
  );
}
