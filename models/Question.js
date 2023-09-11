import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  type: String,
  questionText: String,
  options: [String],
  correctAnswer: mongoose.Schema.Types.Mixed,
});
export default mongoose.model("Question", QuestionSchema);
