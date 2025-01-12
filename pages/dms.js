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
    const {data : session} = useSession();
    const [DM, setDm] = useState({});
    const [DMS, setDMs] = useState([]);
    const[ws, setws] = useState(null);
    const router = useRouter();

useEffect(() => {
    const checkNotifs = async () => {
        const response = await fetch('/api/homePageStart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Shayan Ishaq Janjua' }),
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

  useEffect(() => {
    const websocket = new WebSocket(
      'wss://websocket-database-pinging-production.up.railway.app'
    );

    websocket.onopen = () => {
      console.log('Connected to WebSocket server');
      websocket.send('Hello, start, connect');
    };

    websocket.onmessage = (msg) => {
      console.log('WebSocket Message:', msg.data);
    };

    websocket.onerror = (err) => {
      console.error('WebSocket Error:', err);
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setws(websocket);

    return () => {
      websocket.close();
    };
  }, []);
const handleConvo = (DM) => async () => {
    const r = await fetch('/api/setDM', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          convoID: DM.convoID
        })
    })
    await router.push('/convo');
}
useEffect(() => {
  if (!session?.user?.name) return;

  const checkDMs = async () => {
    try {
      const response = await fetch('/api/getDMs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: session.user.name }),
      });

      const results = await response.json();
      if (results.type === 'error') {
        console.error(results.content);
        return;
      }
      console.log(results.content);
      const res = results.content.split('`');
      res.forEach(e => {
        const [convoID, courseName, user] = e.split(',');
        console.log(convoID + ',' + courseName + ',' + user);
        let d = {
          convoID: convoID,
          courseName: courseName,
          user: user
        }
        if(convoID){
        setDMs(prevDMs => [...prevDMs, d]);}
      });
    } catch (error) {
      console.error('Error fetching DMs:', error);
    }
  };

  checkDMs();
}, [session?.user?.name]);


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
      {DMS.map((dm) => (    
        <Button key = {dm.convoID} onClick={handleConvo(dm)}>
          <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}>
            <Typography>{dm.courseName}・{dm.user}</Typography>
          </Stack>
          <Divider/>
        </Button>
      ))}
    </Stack>
  </Stack>
  </Box>
    
  );
}
