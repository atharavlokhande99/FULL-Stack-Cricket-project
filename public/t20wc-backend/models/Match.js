import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema(
  {
    matchId: { type: String, unique: true, required: true }, // your own ID
    stage: { type: String, enum: ["group", "super8", "semi", "final", "other"], default: "group" },

    teamA: { type: String, required: true },
    teamB: { type: String, required: true },

    venue: { type: String, default: "" },
    dateTime: { type: Date, required: true },

    status: { type: String, enum: ["upcoming", "live", "completed"], default: "upcoming" },

    scoreA: { type: String, default: "" }, // e.g. "182/7 (20)"
    scoreB: { type: String, default: "" }, // e.g. "159/5 (17)"
    note: { type: String, default: "" },   // e.g. "India need 24 off 18"

    resultText: { type: String, default: "" } // e.g. "India won by 6 wkts"
  },
  { timestamps: true }
);

export default mongoose.model("Match", MatchSchema);
