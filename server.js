const express = require('express');
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser');
const port = process.env.PORT || 8089;

const jobs = require('./router/jobs');
const update = require('./router/update');
const remove = require('./router/delete');

app.use(cors());
app.use(bodyParser.json());

app.use('/jobs', jobs);
app.use('/update', update);
app.use('/delete', remove);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
