import React, { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider as StoreProvider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { withApollo } from 'react-apollo'

import routes from './routes'

import { configureStore } from './store'
import LogMonitor from "./utils/LogMonitor";
const store = configureStore()

const history = createBrowserHistory()

const App = () => {
	return (
		<StoreProvider store={store}>
			<Router history={history}>
				{renderRoutes(routes)}
				<LogMonitor />
			</Router>
		</StoreProvider>
	);
};

export default withApollo(App);
