import mongoose from "mongoose";
import ScoresModel from "../models/Scores.js";

export const create = async (req, res) => {
  try {
    const { userId, testId, score } = req.body;
    const doc = new ScoresModel({
      userId: userId,
      testId: testId,
      score: score,
    });
    doc.save()
    res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось пройти тест",
    });
  }
};
export const update = async (req, res) => {
  const {} = req.body;
};
export const getAll = async (req, res) => {
  try {
    const scores = await ScoresModel.find().populate(["userId", "testId"]).exec();
    res.json(scores);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить результаты",
    });
  }
};
export const getAllByTest = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить результаты",
    });
  }
};
export const getAllByUser = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить результаты",
    });
  }
};
