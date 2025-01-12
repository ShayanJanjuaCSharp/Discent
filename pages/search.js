'use client'
import { ethers } from "ethers";
import { getContract } from "@/Contract";
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
import { useSession, signIn, signOut } from "next-auth/react"
import Modal from '@mui/material/Modal';
import { Card, CardActions, CardContent, CardHeader } from "@mui/material";


export default function Home() {
  const [wallet, setWallet] = useState(null);
  const [notifExists, setNE] = useState(false);
  const [numOfNotifs, setNoN] = useState(0);
  const [uID, setuID] = useState("none"); 
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [course, setCourse] = useState({
    name: "",
    teacher: "",
    description: "",
    rating: 0,
    memberCount: 0
  });
  const [search, setSearch] = useState("");
  const router = useRouter();


  const { data: session } = useSession();
  console.log(session);
  
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
      } catch (err) {
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  const addCourse = async (name,teacher,description,date) => {
    if (!wallet) {
      alert("Please connect your wallet first");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = await getContract();
      const contractWithSigner = contract.connect(signer);
      const transaction = await contractWithSigner.addCourse(name,teacher,description,date);
      await transaction.wait();
      alert("Course has been added successfully!");
      await fetchCourses();
    } catch (error) {
      console.error("Failed to add course:", error);
      alert("An error occurred while adding the course. Please try again.");
    }
  };

  const fetchCourses = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = await getContract();
      
      let courseCount;
      try {
        courseCount = await contract.courseCount();
        console.log("Course count:", courseCount);
      } catch (error) {
        console.error("Error fetching course count:", error);
        return;
      }

      const count = Number(courseCount);
      let coursesData = [];
      
      for (let i = 1; i <= count; i++) {
        const course = await contract.courses(i);
        coursesData.push({
          id: course.id.toString(),
          seller: course.seller,
          name: course.name,
          teacher: course.teacher,
        description:course.description,
      date:course.date
        });
      }
      setCourses(coursesData);
      console.log("Courses:", coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  /*function searchCourses(){
    for(let i = 0; i < courses.length; i++){
      if(!(courses[i].name.includes(search))){
        courses.splice(i,1);
        i--;
      }
  }*/

  useEffect(() => {
    const checkNotifs = async () => {
      const response = await fetch('/api/homePageStart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      //const re = await fetch('/api/sendemail', {
        //method: 'POST',
        //headers: { 'Content-Type': 'application/json' },
     // });

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
  <>
<Grid container >
  <Grid size = {3}>
  <Drawer anchor="left" variant="permanent"  PaperProps = {{sx:{width:"20vw"}}} >
    {/*<Stack direction="column" justifyContent={"space-between"} alignItems={"center"} >*/}
    <Typography >CSS</Typography>
    <Stack direction="column" justifyItems={"space-between"} alignItems={"center"}>
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
  <Grid size = {6}>
  <Stack direction="column" justifyItems={"space-around"} alignItems={"center"} spacing={2} sx={{ marginTop: "20px" }}>
    <TextField placeholder="Search for courses..." value = {search} onChange={(e) => setSearch(e.target.value)} sx={{width:"30vw", height:"10vh"}}></TextField>
    <Divider orientation="horizontal" flexItem></Divider>
    <Stack direction="column" >
    </Stack>
  </Stack>
  <div>
  {wallet ? (
    <div>Connected: {wallet.slice(0, 6)}...{wallet.slice(-4)}</div>
  ) : (
    <Button onClick={connectWallet}>Connect Wallet</Button>
  )}
</div>
  <div>
      <Button onClick={handleOpen}>Add Item</Button>
      <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="add-course-modal"
            >
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                p: 4,
                borderRadius: 2,
                }}>
                <Typography variant="h6">
                  Add New Course
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    label="Course Name"
                    value={course.name}
                    onChange={(e) => setCourse({...course, name: e.target.value})}
                    fullWidth
                  />
                  <TextField
                    label="Teacher"
                    value={course.teacher}
                    onChange={(e) => setCourse({...course, teacher: e.target.value})}
                    fullWidth
                  />
                  <TextField
                    label="Description"
                    value={course.description}
                    onChange={(e) => setCourse({...course, description: e.target.value})}
                    multiline
                    rows={3}
                    fullWidth
                  />
                  <TextField
                    label="Date"
                    value={course.date}
                    onChange={(e) => setCourse({...course, date: e.target.value})}
                    multiline
                    rows={1}
                    fullWidth
                  />
            
                  <Button variant="contained" onClick={() => {
                    addCourse(course.name,course.teacher,course.description,course.date);
                    handleClose();
                  }}>
                    Add Course
                  </Button>
                </Stack>
              </Box>
            </Modal>
    </div>
    <div>
    </div>
    <div >
        <div>
          <h2>Available Courses</h2>
          <Button onClick={fetchCourses}>
            Fetch Courses
          </Button>
        </div>

        {courses.length > 0 && (
          <div>
            {courses.map((course) => (
              <Card key={course.id} sx={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 1
              }}>
                <CardContent>
                  <div>
                    <p>
                      <Typography variant="h2">{course.name}</Typography>
                      <br/>
                      <Typography>Teacher Name: {course.teacher}</Typography>
                      <br/>
                      <Typography> Description: {course.description}</Typography>
                      <br/>
                      <Typography> Date Posted: {course.date}</Typography>
                    </p>
                  </div>
                </CardContent>
                    <Button variant="outline">
                      JOIN
                    </Button>
                  <br></br>
              </Card>
            ))}
          </div>
        )}
      </div>
  </Grid>
</Grid>

</>
  );
}
