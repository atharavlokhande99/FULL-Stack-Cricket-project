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
  matchId: { type: String, unique: true },
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


app.get("/api/matches/live", async (req, res) => {
  const matches = await Match.find({ status: "Live" }).sort({ matchDate: 1 });
  res.json(matches);
  
  // ===== IMPORTS =====

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// ===== LOAD ENV =====
dotenv.config();

// ===== CREATE APP =====
const app = express();
app.use(cors());
app.use(express.json());

// ===== DEBUG CHECK =====
console.log("Mongo URI loaded:", process.env.MONGODB_URI ? "YES" : "NO");

// ===== MATCH SCHEMA =====
const matchSchema = new mongoose.Schema(
  {
    matchId: { type: String, unique: true, required: true }, // ✅ important (no duplicates)
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    scoreA: { type: String, default: "" },
    scoreB: { type: String, default: "" },
    status: { type: String, enum: ["live", "upcoming", "completed"], default: "upcoming" },
    venue: { type: String, default: "" },
    matchDate: { type: Date, required: true },
    note: { type: String, default: "" },       // optional
    resultText: { type: String, default: "" }  // optional
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", matchSchema);

// ===== ROUTES =====

// meta
app.get("/api/meta", async (req, res) => {
  const latest = await Match.findOne().sort({ updatedAt: -1 }).select("updatedAt").lean();
  res.json({
    message: "T20 WC Backend Running",
    status: "Connected",
    lastUpdated: latest?.updatedAt || null
  });
});

// buckets
app.get("/api/matches/live", async (req, res) => {
  const matches = await Match.find({ status: "live" }).sort({ matchDate: 1 });
  res.json(matches);
});

app.get("/api/matches/upcoming", async (req, res) => {
  const matches = await Match.find({ status: "upcoming" }).sort({ matchDate: 1 });
  res.json(matches);
});

app.get("/api/matches/results", async (req, res) => {
  const matches = await Match.find({ status: "completed" }).sort({ matchDate: -1 });
  res.json(matches);
});

// all matches
app.get("/api/matches", async (req, res) => {
  const matches = await Match.find().sort({ matchDate: 1 });
  res.json(matches);
});

// ✅ Upsert match (this is what you’ll use after every match)
app.post("/api/match", async (req, res) => {
  try {
    const { matchId, ...data } = req.body;

    const match = await Match.findOneAndUpdate(
      { matchId },              // find match by matchId
      { matchId, ...data },     // update data
      { upsert: true, new: true }
    );

    res.json({ message: "Match saved or updated", match });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// (optional) test route — adds sample match (don’t use in final)
app.get("/add-match", async (req, res) => {
  const sample = {
    matchId: "IND_AUS_01",
    teamA: "India",
    teamB: "Australia",
    scoreA: "185/6 (20)",
    scoreB: "170/9 (20)",
    status: "completed",
    venue: "Mumbai",
    matchDate: new Date(),
    resultText: "India won"
  };

  await Match.findOneAndUpdate({ matchId: sample.matchId }, sample, { upsert: true, new: true });
  res.send("Sample match added/updated");
});

// ===== CONNECT TO MONGODB THEN START SERVER =====
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });
});

app.get("/api/matches/upcoming", async (req, res) => {
  const matches = await Match.find({ status: "Upcoming" }).sort({ matchDate: 1 });
  res.json(matches);
});

app.get("/api/matches/results", async (req, res) => {
  const matches = await Match.find({ status: "Completed" }).sort({ matchDate: -1 });
  res.json(matches);
});


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
