import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AdminPanel from "./AdminPanel";
import {Container} from "./domain/container";
import {RestApiGateway} from "./domain/RestApiGateway";
import {Config} from "./config";

let config = new Config();

config.serverUrl.subscribe(value => {
  const restApiGateway = new RestApiGateway(value);
  const container = new Container(restApiGateway);
  ReactDOM.render(
    <AdminPanel
      container={container}
      ready={config.ready}
      serverUrl={config.serverUrl}/>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
