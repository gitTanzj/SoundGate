import express, { NextFunction, Request, Response } from 'express'
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import supabase from './utils/supabase';

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(req.method, req.path, req.ip)
	next()
})

app.use(async (req: Request, res: Response, next: NextFunction) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization;
		const { data: { user } } = await supabase.auth.getUser(token);
		if (user) {
			req.user = user;
		} else {
			req.user = null;
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}
	}
	next();
});

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