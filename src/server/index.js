require('babel-register');
import express from 'express';
import Loadable from 'react-loadable';
import expressRouter from './api/routes'
import renderViewMiddleware from './middleware/renderView';

const app = express();

// setup static files to load css
app.use(express.static('dist'));
app.use(expressRouter);
app.get('/*', renderViewMiddleware);

app.listen(8080, () => {
  console.log('App listening on port: 8080');
});
