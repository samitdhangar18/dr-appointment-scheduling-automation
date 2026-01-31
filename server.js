const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let appointments = [];

// GET appointments
app.get("/appointments", (req,res)=>{
  res.json(appointments);
});

// POST booking
app.post("/book", (req,res)=>{
  const {name,email,date,time} = req.body;

  const d = new Date(date);
  const day = d.getDay();
  const hour = parseInt(time.split(":")[0]);
  const minute = parseInt(time.split(":")[1]);

  // Mon-Fri
  if(day===0 || day===6)
    return res.json({message:"Doctor works Mon-Fri only"});

  // 9AM-5PM
  if(hour<9 || hour>=17)
    return res.json({message:"Working hours 9AM-5PM"});

  // Lunch 1PM-2PM
  if(hour===13)
    return res.json({message:"Lunch break 1PM-2PM"});

  // Clash + buffer
  for(let a of appointments){
    if(a.date===date){
      const old = a.time.split(":");
      const diff = Math.abs((hour*60+minute)-(old[0]*60+old[1]));
      if(diff<30)
        return res.json({message:"30 min buffer required"});
    }
  }

  appointments.push({name,email,date,time,status:"Confirmed"});
  res.json({message:"Appointment Booked Successfully"});
});

app.listen(3000, ()=>console.log("Server running on 3000"));
