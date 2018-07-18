/*import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './puzzles/sanguo/ChallengeOne';
import template from './Template';

const server = express();
server.use('/', express.static('./'));
server.get('/', (req, res) => {
  const isMobile = true;
  const initialState = { isMobile };
  const appString = renderToString(<App {...initialState} />);
  res.send(template({
    body: appString, // The body is injected here known as server side rendering
    title: 'Hello World from the server',
    initialState: JSON.stringify(initialState)
  }));
});
server.listen(8080);
console.log('listening');*/

const express = require('express');
const app = express();
app.use(express.static('../static'));

app.listen(3000, function () {
    console.log('App started on port 3000');
});
