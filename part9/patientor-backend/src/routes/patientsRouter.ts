import express from 'express';
import patientsServices from '../services/patientsServices';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsServices.getNonSensitiveEntries());
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsServices.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
