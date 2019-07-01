 /* eslint-disable no-multiple-empty-lines */
/* eslint-disable import/first */

const logger = require('./util/logger.js');

import Express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
// import IntlWrapper from '../client/modules/Intl/IntlWrapper';

import config from 'config';

if (!process.env.SERVER_NAME) console.error('! SERVER_NAME undefined !'); // eslint-disable-line no-console
if (!process.env.NODE_ENV) console.error('! NODE_ENV undefined !'); // eslint-disable-line no-console

const serverPort = config.get('server.server_port');
logger.warn(`FoServer Port: ${serverPort}`);

if (process.env.PORT) {
  console.error(`! PORT env var defined, but use ${serverPort} from config file !`); // eslint-disable-line no-console
}






//
// ---------------------  INIT LOGGER  ---------------------
//

import FileStreamRotator from 'file-stream-rotator';
import morgan from 'morgan';

const logDirectory = `${__dirname}/log`;

// ensure log directory exists
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: `${logDirectory}/access-FoServer-%DATE%.log`,
  frequency: 'daily',
  verbose: false,
});




//
// ---------------------  CORS middleware  ---------------------
//

function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}




//
// ---------------------  CREATE SERVER  ---------------------
//


// Initialize the Express App
const app = new Express();




//
// ---------------------  HOT RELOADING  ---------------------
//
/*
import webpack from 'webpack'; // eslint-disable-line import
import webpackConfig from '../webpack.config.hotreload';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

if (process.env.NODE_ENV === 'development') {
  logger.info('Setup hot reloading (Dev only mode)');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}
*/


//
// ---------------------  INIT SERVER  ---------------------
//

// security
app.use(allowCrossDomain);
app.use(helmet());
app.use(helmet.xssFilter({ setOnOldIE: true }));
logger.error('helmet on!');


app.use(compression());
app.use(morgan('combined', { stream: accessLogStream })); // for logging
app.use(bodyParser.json({ limit: '5mb' })); // Mandatory to get body in post requests!
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



// serve our static stuff like index.css
// explanations here: http://expressjs.com/en/starter/static-files.html
app.use(Express.static(path.resolve(__dirname, '../distFoServer')));

// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../distFoServer', 'index.html'));
});

// start app
app.listen(serverPort, (error) => {
  if (!error) {
    logger.info(`FoServer running on port: ${serverPort}`);
  } else {
    logger.error(`! Error, cannot run FoServer on port: ${serverPort}`);
  }
});

export default app;
