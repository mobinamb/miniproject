const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const morgan = require('morgan'); 
const currencyRoutes = require('./routes/currency'); 
const middleware = require('./utils/middleware'); 

const app = express() // Creates an express application in app
//designing the format of the message logged into console

//the following lines were added
function customLogger(tokens, req, res) {
  let logMessage = [
    tokens.method(req, res),    // Request Type
    tokens.url(req, res),       // URL
    tokens.status(req, res),    // Status code
    tokens.res(req, res, 'content-length'), '-',    // Response content length
    tokens['response-time'](req, res), 'ms'    // Response time
  ];

  // Check if it's a POST request and include request body content
  if (req.method === 'POST') {
    logMessage.push(JSON.stringify(req.body));    // Request content being sent
  }
  return logMessage.join(' ');
}

app.use(morgan(customLogger));//using morgan middleware with the defined function

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
//app.use(morgan('dev'));
app.use(cors())
app.use(express.json())

app.use('/api/currency', currencyRoutes);

app.use(middleware.logErrors);
app.use(middleware.unknownEndpoint);


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})