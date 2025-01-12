'use client'
import { useEffect } from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import { Badge, Box, Container, Divider, Rating, Stack, SvgIcon, TextField, Typography } from "@mui/material";
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
    const {data : session} = useSession();
    const [message, setMessage] = useState(""); 
    const [messages, setMessages] = useState([]);
    const[ws, setws] = useState(null);
    const router = useRouter();

/*useEffect(() => {
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
)*/

/*
const websocket = new WebSocket(
    'wss://websocket-database-pinging-production.up.railway.app'
);

websocket.onopen = () => {
    console.log('Connected to WebSocket server');
    websocket.send('Hello, start, connect');
};

websocket.onmessage = (msg) => {
    checkRecieved(msg.data);
};

websocket.onerror = (err) => {
    console.error('WebSocket Error:', err);
};

websocket.onclose = () => {
    console.log('WebSocket connection closed');
};
*/

const checkRecieved = async (msg) => {
    const msgParts = msg.data.split(',');
    const t = await fetch('/api/getTarget', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    const tContent = await t.json();
    const target = tContent.target;
    if(msgParts[0] == target){
        checkDMs();
    }
};

useEffect(() => {
  if (!session?.user?.name) return;

  const checkDMs = async () => {
    try {
      const response = await fetch('/api/getconvo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const results = await response.json();
      if (results.type === 'error') {
        console.error(results.content);
        return;
      }
      console.log(results.content);
      const res = results.content.split('`');
      let newm = [];
      res.forEach(e => {
        let [user, message, time] = e.split(',');
        let intime = parseInt(time);
        time = parseInt(time);
        console.log(intime);
        const t = time.toString();
        let y = t.substring(0, 4);
        let mo = t.substring(4, 6);
        let d = t.substring(6, 8);
        let h = t.substring(8, 10);
        let mi = t.substring(10, 12);
        time = h + ':' + mi + ' ' + d + '-' + mo + '-' + y;
        let m = {
          user: user,
          message: message,
          time: time,
          intime: intime  
        }
        if(user){
        newm.push(m);
        newm = newm.sort((a, b) => a.intime - b.intime);}
    });

      setMessages(newm);
    } catch (error) {
      console.error('Error fetching Messages:', error);
    }
  };

  checkDMs();
}, [session?.user?.name]);

const checkDMs = async () => {
    try {
      const response = await fetch('/api/getconvo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const results = await response.json();
      if (results.type === 'error') {
        console.error(results.content);
        return;
      }
      console.log(results.content);
      const res = results.content.split('`');
      let newm = [];
      res.forEach(e => {
        let [user, message, time] = e.split(',');
        let intime = parseInt(time);
        time = parseInt(time);
        console.log(intime);
        const t = time.toString();
        let y = t.substring(0, 4);
        let mo = t.substring(4, 6);
        let d = t.substring(6, 8);
        let h = t.substring(8, 10);
        let mi = t.substring(10, 12);
        time = h + ':' + mi + ' ' + d + '-' + mo + '-' + y;
        let m = {
          user: user,
          message: message,
          time: time,
          intime: intime  
        }
        if(user){
        newm.push(m);
        newm = newm.sort((a, b) => a.intime - b.intime);}
    });

      setMessages(newm);
    } catch (error) {
      console.error('Error fetching Messages:', error);
    }
  };
const sendMessage = async () => {
  if(!message) return;
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours();
  let minute = time.getMinutes();
  time = minute + 100*hour + 10000*day + 1000000*month + 100000000*year;
  const r = await fetch('/api/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: message,
      time: time
    })
  })
  setMessage("");
  checkDMs();
  /*const u = await fetch('/api/getuser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  const t = await fetch('/api/getTarget', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const ucontent = await u.json();
  const tcontent = await t.json();
  const user = u.content;
  const target = t.content;
  websocket.send(user + ',' + target + ',' + message );*/

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
      {messages.map((m) => (    
        <Box>
          <Stack direction="column" justifyContent={"space-between"} alignItems={m.user == 'you' ? "flex-end" : "flex-start"}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={m.user == 'you' ? "flex-end" : "flex-start"}>
                <Typography sx={{fontSize:"15px"}}>{m.user == 'you' ? '': m.user}</Typography>
                <Typography sx={{fontSize:"10px"}}>{m.time}</Typography>
            </Stack>
            <Typography>{m.message}</Typography>
          </Stack>
          <Divider/>
        </Box>
      ))}
    </Stack>

  <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} spacing={2} sx={{ marginTop: "20px" }}>
    <TextField placeholder="Send message..." sx={{width:"100%"}} value={message} onChange={(e) => setMessage(e.target.value)} ></TextField>
    <Button onClick={sendMessage}>Send</Button>
    </Stack>
  </Stack>
  </Box>
    
  );
}
