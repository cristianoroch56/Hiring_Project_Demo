import { applyMiddleware, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers'
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState = {}) {
    const middlewares = [thunkMiddleware, sagaMiddleware] // loggerMiddleware
    const middlewareEnhancer = composeWithDevTools(
        applyMiddleware(...middlewares)
    )

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = compose(...enhancers)

    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
