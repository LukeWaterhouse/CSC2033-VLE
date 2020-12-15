import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();


const docRef = db.collection('users').doc('alovelace');

 docRef.set({
     first: 'Ada',
     last: 'Lovelace',
     born: 1815
 })


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

