const {initializeDatabase} = require("./db/db.connect")
const Meets = require("./Models/meet.models")
const express = require("express")
const app = express()
app.use(express.json())
const fs = require("fs")
initializeDatabase()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.get("/", (req, res) => {
  res.send("Hello, express server")
})

const jsonData = fs.readFileSync("meets.json", "Utf-8")
const meetsData = JSON.parse(jsonData)

async function seedingData(meetsData){
  try{
    for(const meetData of meetsData){
      const newMeet = new Meets({
        title: meetData.title,
        address: meetData.address,
        price:meetData.price,
        startTime: meetData.startTime,
        endTime: meetData.endTime,
        date: meetData.date,
        tags: meetData.tags,
        mode: meetData.mode,
        description: meetData.description,
        speakers: meetData.speakers,
        requirements: meetData.requirements,
        photos: meetData.photos,
      })
       newMeet.save()
    }
  }catch(error){
    console.log("error while seeding the data.", error)
  }
}

// seedingData(meetsData)

async function readAllMeets(){
  try{
    const allMeets = await Meets.find()
    return(allMeets)
  }catch(error){
    console.log("Failed to read Meets", error)
  }
}
readAllMeets()

app.get("/meets", async (req , res) => {
  try{
    const meets = await readAllMeets()
    if(meets.length > 0){
      res.json(meets)
    }else{
      res.status(404).json({error: "Meets Not Found"})
    }
  }catch(error){
    res.status(500).json({error: "Failed to fetch meets", errorMessage: error.message})
  }
})

async function readMeetsByTitle(meetTitle){
  try{
    const meetsByTitle = await Meets.find({title: meetTitle})
    return(meetsByTitle)
  }catch(error){
    console.log("Failed to read Meets", error)
  }
}

app.get("/meets/:title", async (req, res) => {
  try{
     const meets = await readMeetsByTitle(req.params.title)
     if(meets){
      res.json(meets)
     }else{
      res.status(404).json({error: "Meets Not Found"})
    }
  }catch(error){
    res.status(500).json({error: "Failed to fetch meets", errorMessage: error.message})
  }
})


async function readMeetsByTags(meetTags){
  try{
    const meetsByTags = await Meets.find({tags: meetTags})
    return(meetsByTags)
  }catch(error){
    console.log("Failed to read Meets", error)
  }
}

// readMeetsByTags("Educational")

app.get("/meets/tags/:meetTags", async (req, res) => {
  try{
     const meets = await readMeetsByTags(req.params.meetTags)
     if(meets.length > 0){
      res.json(meets)
     }else{
      res.status(404).json({error: "Meets Not Found"})
    }
  }catch(error){
    res.status(500).json({error: "Failed to fetch meets", errorMessage: error.message})
  }
})

async function readMeetsByMode(meetmode){
  try{
    const meetsByMode = await Meets.find({mode: meetmode})
    return(meetsByMode)
  }catch(error){
    console.log("Failed to read Meets", error)
  }
}

// readMeetsByTitle("Corporate Leadership Summit")

// readMeetsByMode("Offline")

app.get("/meets/mode/:meetMode", async (req, res) => {
  try{
     const meets = await readMeetsByMode(req.params.meetMode)
     if(meets.length > 0){
      res.json(meets)
     }else{
      res.status(404).json({error: "Meets Not Found"})
    }
  }catch(error){
    res.status(500).json({error: "Failed to fetch meets", errorMessage: error.message})
  }
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server is running on port", PORT)
})