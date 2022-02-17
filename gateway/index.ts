import morgan from 'morgan';
import express from 'express';
import { configure } from './config/proxy.config';

const port = Number(process.env.PORT ?? 8000)
const app = express();

app.use(morgan('dev'));
app.use(configure);

app.listen(port, () => {
    console.log(`API Gateway listening on ${port} port!`)
});
