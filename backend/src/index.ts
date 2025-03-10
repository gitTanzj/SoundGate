import express, { Request, Response } from 'express'
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world")
})


import authRoutes from './routes/auth'
app.use('/api/auth', authRoutes)

import userRoutes from './routes/user'
app.use('/api/user', userRoutes)

import musicRoutes from './routes/music'
app.use('/api/music', musicRoutes)

if (process.env.MODE === 'prod') {
	app.use(express.static(path.join(__dirname, '../', 'frontend')));
	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, '../', 'frontend', 'index.html'));
	});
}


app.listen(3000, () => {
    console.log("Server running on port 3000");
})