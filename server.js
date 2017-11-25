const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const model = require('./ml');

app.use(bodyParser.json());

app.post('/predict', (req, res) => {
  //call python script with data
  console.log('Making prediction...');
  console.log(req.body);
  let recs = model.predict(req.body);

  res.send(recs);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
