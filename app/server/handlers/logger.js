const { createLogger, format, transports } = require('winston');

const transportsArr = {
  console: new transports.Console({
      level: 'info',
      handleExceptions: false,
      json: false,
      colorize: true,
      timestamp: true
  })
};

var logger = createLogger({
    level: 'info',
    format: format.combine(
      format.colorize({ all: true }),
      format.splat(),
      format.simple()
    ),
    transports: [
        transportsArr.console
    ],
    exitOnError: false
});

module.exports = logger;
/*
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}
*/
