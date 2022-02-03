const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
    const random = getRandomElement(quotes)
    res.send({
        quote: random
    })
});

app.get('/api/quotes', (req, res) => {
    if (!req.query.person) {
        res.send({
            quotes: quotes
        })
    } else {
        let personQuo = [];
        for (let i = 0; i< quotes.length; i++) {
            let quoteObject = quotes[i];
            if (req.query.person === quoteObject.person) {
                personQuo.push(quotes[i])
            }
        };
        res.send({
            quotes: personQuo
        })
    }
});

app.post('/api/quotes', (req, res) => {
    if (req.query.quote && req.query.person) {
        quotes.push(req.query);
        res.send({
            quote: req.query
        })
    } else {
        res.status(400).send()
    }
});

app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`)
});