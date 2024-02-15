const express = require('express');
const middleware = require('./utils/middleware');
const cors = require('cors');
const morgan = require('morgan');
//const sequelize = require('./database')
const { initConnection: initDBConnection } = require('./database')
const  currencyRoutes  = require('./routes/currency');
const  countryRoutes  = require('./routes/country');
const  currencyCountryRouter  = require('./routes/currency_country')

const app = express();

function customLogger(tokens, req, res) {
    let logMessage = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ];

    if (req.method === 'POST') {
        logMessage.push(JSON.stringify(req.body));
    }
    return logMessage.join(' ');
}

app.use(morgan(customLogger));
app.use(cors());
app.use(express.json());

initDBConnection();

app.get('/', (request, response) => {
	response.send('Hello World!')
})

app.use(middleware.logErrors);
app.use('/api/currency', currencyRoutes);
app.use('/api/country', countryRoutes);
app.use('/api/currency-country', currencyCountryRouter)

app.use(middleware.unknownEndpoint);

const PORT = 3001;
const CurrencyConverterServevr = app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})

module.exports = CurrencyConverterServevr


/*sequelize.sync().then( 
    console.log('database is synced'),
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    })  

).catch(err => console.log('error in syncing the database', err)  );*/


/*sequelize.sync().then(() => {
    console.log('database is synced');

    const server = app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    }).on('error', (err) => {
        console.error('Error starting server:', err);
        // Handle error appropriately
    });
    module.exports = server;
}).catch(err => {
    console.log('error in syncing the database', err);
    // Handle database sync error appropriately
});

*/



