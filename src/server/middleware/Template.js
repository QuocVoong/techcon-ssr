import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

const Template = (props) => {
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
        window.__SERIALIZED_STATE__ = ${serialize(props.serverState)}
      `
    }}
    />
    <script src="/app.bundle.js" />
    <script src="/vendor.bundle.js" />
    <div
      dangerouslySetInnerHTML={{ __html: props.bundlesString }}
    />
    </body>
    </html>
  );
};

Template.propTypes = {
  renderedToStringComponents: PropTypes.string
};

export default Template;
