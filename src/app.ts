import express from 'express';
import { corsMiddleware } from './middlewares/cors';
import { delayMiddleware } from './middlewares/delay';
import { createStatusResponse } from './models/statusResponse';
import { indexRouter } from './routes/index';
import { mirrorRouter } from './routes/mirror';
import { statusRouter } from './routes/status';
import { environment } from './env';

const app = express();

// Disable X-Powered-By header
app.disable('x-powered-by');

app.use(express.json());
app.use(corsMiddleware);
app.use(delayMiddleware);

app.use('/', indexRouter);
app.use('/mirror', mirrorRouter);
app.use('/status', statusRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json(createStatusResponse(404, 'Resource not found'));
});

app.listen(environment.port, () => {
  console.log(`Server is running on http://localhost:${environment.port}`);
});
