const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

if( process.env.NODE_ENV !==  'production' ) {
	require('dotenv').config();
}

const WEATHERSTACK_CURRENT_URL = 'http://api.weatherstack.com/current';
const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;

app.use(express.json());
app.use(express.static('public'));

app.post('/current', (req, res) => {
	var url = `${WEATHERSTACK_CURRENT_URL}?access_key=${WEATHERSTACK_API_KEY}&query=${req.body.query}`;
	
	axios({
		url: url,
		responseType: 'json'
	}).then((data) => res.json(data.data));

});

app.get('/', (req, res) => {
	res.send('Hello World...!');
})

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
})
