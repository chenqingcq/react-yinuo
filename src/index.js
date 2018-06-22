import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import 'lib-flexible';

import './service'
import './utils/lib/lib.js'
import './utils/lib/md5.js'
// import './redux'//redux;

import './assets/css/common.css'//引入公共样式
import './assets/css/font.css'//引入公共字体

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
