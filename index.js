const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 1234;

app.use(express.json());

app.use(cookieParser())

const userRoutes = require('./src/app');
const { sequelizeConnection } = require('./models');

app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
        // sequelizeConnection();
})