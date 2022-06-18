const express = require('express');
const db = require('./db');
const PORT = process.env.PORT || '3000';
const route = require('./routes');

const initExpressServer = () => {
    const app = express();

    app.use('/api', route);

    app.listen(PORT, () => {
        console.log('Server is running on port: ', PORT)
    })
}

const start = async () => {
    try {
        await db.authenticate();
        await db.sync({force: true})
        console.log('Connection has been established successfully.');
        initExpressServer();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

start();