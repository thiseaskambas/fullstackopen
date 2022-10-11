import express from 'express';
import cors from 'cors';
import diagnosesRoutes from './routes/dignosesRouter';
import patientesRoutes from './routes/patientsRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.json('pong');
});

app.use('/api/diagnoses', diagnosesRoutes);
app.use('/api/patients', patientesRoutes);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
