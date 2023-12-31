import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';

import mongoose from 'mongoose';

import { registerValidation, loginValidation } from './validations.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { ScoresController, TestController, UserController } from './controllers/index.js';

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();


const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});


app.get('/tests', TestController.getAll);
app.get('/tests/:id', TestController.getOne);
app.post('/tests', checkAuth, handleValidationErrors, TestController.create);
app.patch(
  '/tests/:id',
  checkAuth,
  handleValidationErrors,
  TestController.update,
);
app.get('/scores', ScoresController.getAll);
app.post('/scores', checkAuth, handleValidationErrors, ScoresController.create);
app.get('/scores/test/:id', ScoresController.getAllByTest);
app.get('/scores/user/:id', ScoresController.getAllByTest);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
