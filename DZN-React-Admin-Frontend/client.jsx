import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './_app';

const Hot = hot(App);

ReactDom.render(<Hot />, document.querySelector('#root'));