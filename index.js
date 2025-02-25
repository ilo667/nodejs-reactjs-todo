const express = require('express');
const path = require('path');
const sequelize = require('./utils/database');
const todoRoutes = require('./routes/todo');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api/todo', todoRoutes);

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
    res.sendFile('/index.html');
});

async function start() {
    try {
        await sequelize.sync();
        app.listen(PORT);
    } catch (e) {
        console.log(e);
    }
}

start();
