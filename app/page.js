'use client'
import { useEffect } from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import { Badge, Box, Container, Divider, Stack, SvgIcon, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import MessageSharpIcon from '@mui/icons-material/MessageSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TextField from '@mui/material/TextField';
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  const notifExists = false;
  const numOfNotifs = 0;
  const [uID, setuID] = useState("none"); 
  const router = useRouter();
  const bakery = cookies();

  useEffect(() =>{
    setuID(bakery.get("userID"));

    if(uID=="none"){
      notifExists = false;
    }else{
      const getNotifs = async () =>{
      const response = await fetch('/api/homePageStart', {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body:uID,
      })

      if(response.ok){
        const results = response.json();
      }
      if(results.type == "error"){
        console.log(error);
      }else{
        const resultarr = results.split(",");
        if(resultarr[0] == "true"){
            notifExists = true;
            numOfNotifs = resultarr[1];
        }else{
          notifExists = false;
        }
      }
    }
    }
  })

  let ws;
  if(ws){
    ws.onerror = ws.onopen = ws.onclose = ws.onmessage = null;
  }

  ws = new WebSocket("https://websocket-database-pinging-production.up.railway.app");

ws.onopen = () => {
  console.log("Connected");
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
}   

    
return (
  <Box sx={{width:"100vw", height:"100vh"}} justifyContent={"space-around"}>
  <AppBar position="static"  color="white" sx={{width:"80vw",left:"10vw"}} px={4} >
    <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} >
    <Typography >CSS</Typography>
    <Stack direction="row">
      <Button variant="text"><HomeRoundedIcon/></Button>
      <Button variant="text"><SearchSharpIcon/></Button>
      <Button variant="text"><MessageSharpIcon/></Button>
      <Badge badgeContent={numOfNotifs} color="primary">
        <Button variant="text">(notifExists?<NotificationsSharpIcon/>:<NotificationsNoneSharpIcon/>)</Button>
      </Badge>
      <Button variant="text"><AccountCircleIcon/></Button>
    </Stack>
    <Button><SettingsRoundedIcon/></Button>
    </Stack>
  </AppBar>
  <Stack direction="column" justifyItems={"space-around"} alignItems={"center"} spacing={2} sx={{ marginTop: "20px" }}>
    <TextField placeholder="Search" sx={{width:"700px", height:"100px"}}></TextField>
    <Divider orientation="horizontal" flexItem></Divider>
    <Stack direction="column" >
    </Stack>
    </Stack>
    </Box>
    
  );
}
