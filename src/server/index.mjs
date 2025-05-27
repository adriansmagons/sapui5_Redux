import express from 'express';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const testData = [
					{
						"_id": 333,
						"name": "Karl",
						"surname": "Iowa",
						"age": 44,
						"gender": "male",
						"position": "Full-back"
					},
					{
						"_id": 222,
						"name": "Jane",
						"surname": "Smith",
						"age": 33,
						"gender": "female",
						"position": "Full-back"
					},
					{
						"_id": 111,
						"name": "Peter",
						"surname": "Mcdonald",
						"age": 24,
						"gender": "male",
						"position": "Centre-back"
					}
			]

app.use(bodyParser.json());

app.use('/client', express.static(path.join(__dirname, '../../dist')));

app.get('/api', (req, res) => {
	res.sendStatus(404);
});

app.get('/api/athletes', (req, res) => {
	setTimeout(() => {
		res.json(testData);
		}, "3000");       // simulate loading
});

app.listen(3000, () => {
	console.log(`Server running on http://localhost:3000`);
});
