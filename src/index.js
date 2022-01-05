const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const episode = require('./router/episode');
const character = require('./router/character');
const episodeID = require('./router/ep-id');
const characterID = require('./router/char-id');
const middleRouter = [episode, character, episodeID, characterID];

app.use(bodyParser.json()); // => for JSON data analyis
app.use(helmet());// => for safety
for (let i = 0; i < middleRouter.length; i++) {
  app.use('/', middleRouter[i]);
}
app.use(bodyParser.urlencoded({ extended: true })); // => for form data analyis
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res, next) {
  const err = new Error();
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {
  if (err.status === 404) {
    const data = {
      title: '404 Not Found',
      content: 'Oops, page not found!',
    };
    res.status(404).json(data);
  } else if (err.status === 405) {
    res.status(405).json({
      title: '405 Not Allowed',
      content: 'Method not Allowed',
    });
    res.status(404).json(data);
  } else {
    return next();
  }
});


process.on('uncaughtException', (err) => {
  console.error(err && err.stack);
});


app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});