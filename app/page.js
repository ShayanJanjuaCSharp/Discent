'use client'


export default function Home() {
  let ws;
  if(ws){
    ws.onerror = ws.onopen = ws.onclose = ws.onmessage = null;
  }

  ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    console.log("Connected");
    ws.send("Hello,what");
  }

  ws.onmessage = (msg) =>{
    console.log(msg.data);
  }

  ws.onclose = () => {
    console.log(msg.data);
  }

  ws.onclose = () => {
    ws = null;
  }
  return (
    <div>
      <label>Hello World!</label>
    </div>
  );
}
