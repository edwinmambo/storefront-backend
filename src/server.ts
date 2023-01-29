import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './handlers/product_routes';
import userRoutes from './handlers/user_routes';
import orderRoutes from './handlers/order_routes';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

const corsOptions = {
  origin: address,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
