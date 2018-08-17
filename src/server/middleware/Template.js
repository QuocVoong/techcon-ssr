import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

const Template = (props) => {
  return (
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#5f5eaa" />
      <meta name="Description" content="My demo website" />
      <title>All Things Website</title>
      <link rel="shortcut icon" href="/assets/favicon.ico" />
      <link
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/assets/style.css" />
      {/*<link rel="stylesheet" href="/assets/semantic.min.css" />*/}
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
