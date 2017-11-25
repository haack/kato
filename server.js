const express = require('express');
const app = express();
const model = require('./ml');

app.get('/predict', (req, res) => {
  //call python script with data
  console.log('Making prediction...');
  let recs = model.predict(req.data);

  res.send(recs);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
