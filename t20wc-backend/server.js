// ===== IMPORTS =====
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// ===== LOAD ENV =====
dotenv.config();

// ===== CREATE APP =====
const app = express();
app.use(cors());
app.use(express.json());

// ===== DEBUG CHECK =====
console.log("Mongo URI loaded:", process.env.MONGODB_URI ? "YES" : "NO");

// ===== CONNECT TO MONGODB =====
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });

// ===== TEST ROUTE =====
app.get("/api/meta", (req, res) => {
  res.json({
    message: "T20 WC Backend Running",
    status: "Connected"
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ===== MATCH SCHEMA =====
const matchSchema = new mongoose.Schema({
  teamA: String,
  teamB: String,
  scoreA: String,
  scoreB: String,
  status: String,
  venue: String,
  matchDate: Date
});

const Match = mongoose.model("Match", matchSchema);
// Add new match
app.post("/api/match", async (req, res) => {
  try {
    const newMatch = new Match(req.body);
    await newMatch.save();
    res.json({ message: "Match saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all matches
app.get("/api/matches", async (req, res) => {
  const matches = await Match.find();
  res.json(matches);
});
app.get("/add-match", async (req, res) => {
  const newMatch = new Match({
    teamA: "India",
    teamB: "Australia",
    scoreA: "185/6",
    scoreB: "170/9",
    status: "Completed",
    venue: "Mumbai",
    matchDate: new Date()
  });

  await newMatch.save();
  res.send("Match Added Successfully");
});
