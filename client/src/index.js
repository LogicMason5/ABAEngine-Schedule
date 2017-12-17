import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserForm from './UserForm';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<UserForm />, document.getElementById('root'));
registerServiceWorker();
