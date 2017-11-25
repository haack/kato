const express = require('express');
const app = express();
const model = require('./ml');

let top = model.predict([null, null, null, null, null, null, 'alt_rock', null]);
console.log(top);

// const locations = [
//   {
//     name: "london",
//     finnairId: 123,
//   },
// ]
//
// app.get('/locations', (req, res) => res.send(locations))
//
// app.get('/answer', (req, res) => console.log('nice'))
//
// app.get('/predict', (req, res) => {
//   //call python script with data
//   let recs = [{...locations, rating: 0.5}];
//
//   res.send(recs)
// })
//
// app.listen(3000, () => console.log('Example app listening on port 3000!'))
