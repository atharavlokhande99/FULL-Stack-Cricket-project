import mongoose from "mongoose";

const PlayerStatSchema = new mongoose.Schema(
  {
    player: { type: String, required: true },
    team: { type: String, default: "" },

    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },

    // optional fields if you want later
    innings: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    economy: { type: Number, default: 0 }
  },
  { timestamps: true }
);

PlayerStatSchema.index({ player: 1 }, { unique: true });

export default mongoose.model("PlayerStat", PlayerStatSchema);
