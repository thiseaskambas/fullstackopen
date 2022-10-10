import express = require('express');
import { Request } from 'express';
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/hello', (_req, res) => {
  res.send('hello FullStack');
});

// http://localhost:3002/bmi?height=180&weight=72

interface GetHeightAndWeight extends Request {
  height: string;
  weight: string;
}

interface GetExercisesParams extends Request {
  daily_exercises: Array<number>;
  target: number;
}

//TODO: clean try catch block
app.get('/bmi', (req: GetHeightAndWeight, res) => {
  try {
    const { height, weight } = req.query;
    const bmi = bmiCalculator(Number(height), Number(weight));
    return res.json({ height, weight, bmi });
  } catch (err) {
    return res.json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req: GetExercisesParams, res) => {
  try {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
      return res.json({ error: 'parameters missing' });
    }
    const result = calculateExercises(target, daily_exercises);
    return res.json(result);
  } catch (err) {
    return res.json({ error: 'malformatted parareturn meters' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listenning to port ${PORT}`);
});
