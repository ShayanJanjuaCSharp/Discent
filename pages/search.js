'use client'
import { useEffect } from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import { Badge, Box, Container, Divider, Drawer, Stack, SvgIcon, Typography } from "@mui/material";
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
import Grid from '@mui/material/Grid2';

export default function Home() {
  const [notifExists, setNE] = useState(false);
  const [numOfNotifs, setNoN] = useState(0);
  const [uID, setuID] = useState("none"); 
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({
    name: "",
    teacher: "",
    description: "",
    rating: 0,
    memberCount: 0
  });
  const [search, setSearch] = useState("");
  const router = useRouter();
  
  function addCourses(){
    const cList = //Courses you add through solidity
    setCourses(cList);
    sortCourses();
  }

  function searchCourses(){
    for(let i = 0; i < courses.length; i++){
      if(!(courses[i].name.includes(search))){
        courses.splice(i,1);
        i--;
      }
  }
  
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
<Grid container >
  <Grid size = {4}>
  <Drawer anchor="left" variant="permanent" justifyContent={"space-between"} alignItems={"left"} width={"100%"}>
    {/*<Stack direction="column" justifyContent={"space-between"} alignItems={"center"} >*/}
    <Typography >CSS</Typography>
    <Stack direction="column" justifyContent={"space-between"} alignItems={"center"}>
      <Button variant="text" onClick={() => router.push("/") }>Home <HomeRoundedIcon/></Button>
      <Button variant="text" onClick={() => router.push("/search") }>Search <SearchSharpIcon/></Button>
      <Button variant="text">DMs <MessageSharpIcon/></Button>
      <Badge badgeContent={numOfNotifs} color="primary">
        <Button variant="text">Notifications {(notifExists?<NotificationsSharpIcon/>:<NotificationsNoneSharpIcon/>)}</Button>
      </Badge>
      <Button variant="text">Profile <AccountCircleIcon/></Button>
    </Stack>
    <Button>Settings <SettingsRoundedIcon/></Button>
  </Drawer>
  </Grid>
  <Grid size = {4}>
  <Stack direction="column" justifyItems={"space-around"} alignItems={"center"} spacing={2} sx={{ marginTop: "20px" }}>
    <TextField placeholder="Search" sx={{width:"700px", height:"100px"}}></TextField>
    <Divider orientation="horizontal" flexItem></Divider>
    <Stack direction="column" >
    </Stack>
  </Stack>
  </Grid>
</Grid>
    
  );
}
