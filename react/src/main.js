import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App'

$( document ).ready(function() {
  console.log("ready!");
  let date = Date.now()
  let newDate = (new Date()).getTime();
  let offset = - new Date().getTimezoneOffset()/60;
  let hours = (new Date()).getHours();
  let newNewDate = (new Date()).setHours(hours - offset);
  console.log(date)
  console.log(newDate)
  console.log(offset)
  console.log(hours)
  console.log(newNewDate)
})
$(function() {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
});
