import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import { SampleApp } from './components/SampleApp';

const Hot = hot(SampleApp);

ReactDOM.render(<Hot />, document.querySelector('#app'));
