const fs = require('fs');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const mongoUri = config.get('mongoUri');

fs.readFile(path.join(__dirname, 'db.json'), 'utf-8', async (err, data) => {
    if (err) {
        console.error(err.message);
        return;
    }

    mongoose.connect(mongoUri);
    mongoose.connection.collections['products'].drop()
        .then(() => {
            console.log('Коллекция успешно удалена!');
            writeDataToMongoDB();
        })
        .catch((err) => `Что-то пошло не так ${err.message}`);

    function writeDataToMongoDB() {
        Promise.all(JSON.parse(data).map(async row => await Product.create(row)))
            .then(() => {
                console.log('Все изменения успешно записаны!');
                mongoose.disconnect();
            })
            .catch((err) => console.error(err));
    }
});