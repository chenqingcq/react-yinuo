import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
// import 'lib-flexible';

import './service'
import './utils/lib/lib.js'
import './utils/lib/md5.js'
// import './redux'//redux;
import './App.css'
import './assets/css/common.css'
import './assets/css/font.css'
import 'antd-mobile/dist/antd-mobile.css';


import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
