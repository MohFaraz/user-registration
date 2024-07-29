require('dotenv').config();
const express = require('express');
const UserRouter = require('./routers/user');
const cors = require('cors')
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', UserRouter);
app.get('*', async (req, res) => {
    res.status(200).send('I am alive');
});
app.listen(PORT, () => {
    console.log(`App Listening at http://localhost:${PORT}`);
});