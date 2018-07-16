import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

const HTML = (props) => {
  return (
    <html lang="en">
    <head>
      <title>All Things Westies</title>
      <link rel="shortcut icon" href="/assets/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/semantic-ui/2.2.4/semantic.min.css"
      />
      <link rel="stylesheet" href="/assets/style.css" />
    </head>
    <body>
    <div
      id="root"
      dangerouslySetInnerHTML={{ __html: props.renderedToStringComponents }}
    />
    <script dangerouslySetInnerHTML={{
      __html: `
        window.__SERIALIZED_STATE__ =
         ${serialize(props.serverState, { isJSON: true } )}
      `
    }}
    />
    <script type="application/javascript" src="/bundle.js" />
    </body>
    </html>
  );
};

HTML.propTypes = {
  renderedToStringComponents: PropTypes.string
};

export default HTML;
