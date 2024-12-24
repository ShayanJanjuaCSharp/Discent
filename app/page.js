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

export default function Home() {
  const [notifExists, setNE] = useState(false);
  const [numOfNotifs, setNoN] = useState(0);
  const [uID, setuID] = useState("none"); 
  const router = useRouter();
  
  useEffect(() => {
    const checkNotifs = async () => {
      const response = await fetch('/api/homePageStart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to fetch notifications');

      const results = await response.json();
      const type = results.type;

      if (type === 'error') throw new Error(results.content);
      else{
        const resultarr = results.split(",");
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
}   

    
return (
  <Box sx={{width:"100vw", height:"100vh"}} justifyContent={"space-around"}>
  <AppBar position="static"  color="white"  px={4} >
    <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} >
    <Typography >CSS</Typography>
    <Stack direction="row">
      <Button variant="text"><HomeRoundedIcon/></Button>
      <Button variant="text"><SearchSharpIcon/></Button>
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
    <TextField placeholder="Search" sx={{width:"700px", height:"100px"}}></TextField>
    <Divider orientation="horizontal" flexItem></Divider>
    <Stack direction="column" >
    </Stack>
    </Stack>
    </Box>
    
  );
}
