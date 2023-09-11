import mongoose from "mongoose";
import TestModel from "../models/Test.js";
import Question from "../models/Question.js";

export const getAll = async (req, res) => {
  try {
    const tests = await TestModel.find().populate(["user", "questions"]).exec();
    res.json(tests);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить тесты",
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const testId = req.params.id;
    const test = await TestModel.findOne({ _id: testId }).populate(["user", "questions"]).exec();
    res.json(test);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось найти тест",
    });
  }
};
export const remove = async (req, res) => {
  try {
  } catch {}
};
export const create = async (req, res) => {
  try {
    const { title, description, user, imageUrl, time, questionsData } =
      req.body;
    const doc = new TestModel({
      title: title,
      description: description,
      user: user,
      imageUrl: imageUrl,
      time: time,
      questions: [],
    });
    const createdQuestions = await Question.create(questionsData);
    doc.questions = createdQuestions.map((question) => question._id);
    const test = await doc.save();
    res.json(test);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать тест",
    });
  }
};
export const update = async (req, res) => {
  try {
    const { title, description, userId, time, imageUrl, questionsData } =
      req.body;
    const testId = req.params.id;

    const existingTest = await TestModel.findById(testId);
    if (!existingTest) {
      return res.status(404).json({ message: "Тест не найден" });
    }

    existingTest.title = title;
    existingTest.time = time;
    existingTest.description = description;
    existingTest.imageUrl = imageUrl;

    await Question.deleteMany({ _id: { $in: existingTest.questions } });

    const createdQuestions = await Question.create(questionsData);
    existingTest.questions = createdQuestions.map((question) => question._id);

    const test = await existingTest.save();

    res.json(test);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить тест",
    });
  }
};
