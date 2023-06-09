'use strict';

module.exports = (req, res, next) => {
  console.log('404 error handler');
  res.status(404).json({
    error: 404,
    route: req.baseUrl,
    method: req.method,
    message: req.method === 'GET' ? 'Route not found' : `Method not found`,
  });
  
};
