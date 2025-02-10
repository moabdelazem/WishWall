const logger = (req, res, next) => {
  // Get the current time of the request
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

export default logger;
