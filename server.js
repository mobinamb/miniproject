const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const morgan = require('morgan'); 
const currencyRoutes = require('./routes/currency'); 
const middleware = require('./utils/middleware'); 

const app = express() // Creates an express application in app

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(morgan('dev'));
app.use(cors())
app.use(express.json())

app.use('/api/currency', currencyRoutes);

app.use(middleware.logErrors);
app.use(middleware.unknownEndpoint);


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})