import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
// const port = 3000

// parser

app.use(express.json());
app.use(cors());

const controller=  (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
}

app.get('/', controller);

export default app;
