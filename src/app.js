import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink,Route,BrowserRouter,HashRouter as Router, Swith,Redirect} from 'react-router-dom';
import RouteConfig from './config/Route.jsx';
import {Provider} from 'react-redux';
import store from './store/store.jsx';


var div=document.createElement("div");
div.setAttribute("id","root");
document.body.insertBefore(div,document.body.childNodes[0]);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            {RouteConfig}
        </Router>
    </Provider>
    ,document.getElementById('root'));