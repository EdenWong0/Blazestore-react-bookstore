import express from 'express';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import App from './src/App';


const app = express();

app.use(express.static('build'));

app.get('*', (req, res) => {
  try {
    const appMarkup = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    );

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bookstore</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <!-- Stylesheets and other <head> tags go here. -->
        </head>
        <body>
          <div id="root">${appMarkup}</div>
          <!-- Client-side bundle script tags go here. -->
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Server-side rendering error:', error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
