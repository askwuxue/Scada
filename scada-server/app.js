const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.post('/report', (req, res) => {
  console.log(
    '-------------------------------------------------------------------------------------',
  );
  console.log('req: ', req.url);
  console.log('req: ', req.body);
  res.status(200).send('');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
