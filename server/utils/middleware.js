const logErrors = (error, request, response, next) => {
    console.error(error.stack);
    next(error);
  };
  
  const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'Unknown endpoint' });
  };
  
  module.exports = {
    logErrors,
    unknownEndpoint,
  };