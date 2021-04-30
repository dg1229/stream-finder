const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const unirest = require("unirest");
const API_KEY = "AIzaSyAZRdOzsVe4vHOFdJ5R03TGq_1xddI6fAk";

app.get('/api/streams/:word', (req, res) => {
	const word = req.params.word;
	const request = unirest.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=25&q=${word}&type=video&key=${API_KEY}`)
	.then(response => {
		const results = response.body.items || []; // grab array of results
		console.log(results);
		//console.log(`Num results=${results.length}`);
		res.json(results);
	})
	.catch(error => {
		console.log(`error=${error}`);
		res.json({status:"Error", message: `${error}`});
	});
});

app.listen(port, () => {
  console.log(`stream-finder listening on port ${port}`);
});

// import path library
const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// ...

// put this AFTER the other `app.get(...`
// for any request that doesn't match one above, send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});