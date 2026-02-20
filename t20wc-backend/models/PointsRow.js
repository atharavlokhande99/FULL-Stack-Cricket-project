import mongoose from "mongoose";

const PointsRowSchema = new mongoose.Schema(
  {
    group: { type: String, required: true },  // "A", "B", ...
    team: { type: String, required: true },

    played: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    nrr: { type: Number, default: 0 },
    points: { type: Number, default: 0 }
  },
  { timestamps: true }
);

PointsRowSchema.index({ group: 1, team: 1 }, { unique: true });

export default mongoose.model("PointsRow", PointsRowSchema);
