import express from 'express';
import diagnosesServices from '../services/diagnosesServices';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesServices.getDiagnoses());
});

router.get('/:code', (req, res) =>
  res.send(diagnosesServices.getDiagnoseByCode(req.params.code))
);

export default router;
