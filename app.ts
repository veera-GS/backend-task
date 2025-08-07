import express, { Request, Response } from 'express';
import cors from 'cors'
import mainrouter from './src/main.router'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet';

export const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())
app.use(helmet());


export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6, 
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.use('/api/taskapp', mainrouter)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
