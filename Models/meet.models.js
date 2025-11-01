const mongoose = require("mongoose")

const meetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    enums: ["Educational", "Sports", "Business", "Professional", "Social Gathering", "Arts", "Entertainment" ],
    required: true
  },
  mode : {
    type: String,
    enums: ["Online", "Offline", "Both"],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  speakers: {
    type: String,
  },
  requirements: {
    type: String,
  },
   photos: {
    type: [String] ,
  },
},{
  timestamps: true
})

const Meets = mongoose.model("Meets", meetSchema)

module.exports = Meets
