var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');
var config;
  // NOTE: paste dynamic-import-node direct in babel plugins will not work for webpackChunkName
try {
  config = JSON.parse(babelrc);
  if (Array.isArray(config.plugins)) {
    config.plugins.push('dynamic-import-node');
  }

} catch (err) {
  console.error('==> ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-register')(config);
require('./server');
