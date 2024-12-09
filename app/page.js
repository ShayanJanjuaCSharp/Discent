'use client'
import { useEffect } from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import { Box, Container, Divider, Stack, SvgIcon, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CenterFocusStrong, Rowing } from "@mui/icons-material";
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import MessageSharpIcon from '@mui/icons-material/MessageSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TextField from '@mui/material/TextField';
export default function Home() {
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
        <Button variant="text"><NotificationsNoneSharpIcon/></Button>
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
