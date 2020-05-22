const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '8b9b7396a5904eceba280345b0195a1c'
 });

const handleApiCall = (req, res) => {
  app.models
  .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('Unable to fetch image api'))
}

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if (entries.length) {
        res.json(entries[0])
      } else res.status(400).json('User id not found')
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}