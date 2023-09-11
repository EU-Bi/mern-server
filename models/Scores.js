import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
    score: Number,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Scores", ScoreSchema);