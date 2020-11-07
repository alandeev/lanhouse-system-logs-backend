const express = require('express');
const routes = require('./routes');
const port = 3331;

//Starting Database
require('./database');

const app = express();

app.use(express.json());

//converting all body in the lowercase!
app.use((req, res, next) => {
  const keys = Object.keys(req.body);
  if(keys.length > 0) for (var key of keys) req.body[key] = typeof(req.body[key]) == "string" ? req.body[key].toLowerCase() : req.body[key];
  next();
})

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running in the port ${port}`)
});
