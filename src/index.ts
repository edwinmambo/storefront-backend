import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRouter from './routes/index.route';

const app: Application = express();
const address: string = '0.0.0.0:3000';

const corsOptions = {
  origin: address,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.get('/', function (_req: Request, res: Response) {
  res.redirect('/api');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
