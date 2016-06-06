import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import Main from './components/template/Main';
import ChartContainer from './containers/ChartContainer';

export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={ Main }>
                <IndexRoute component={ ChartContainer } />
            </Route>
        </Router>
    );
}
