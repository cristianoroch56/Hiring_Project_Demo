import { combineReducers } from 'redux'

import authReducer from './Auth'
import messageReducer from './Message'
import logsReducer from './Logs'

const rootReducer = combineReducers({
    Auth: authReducer,
    Message: messageReducer,
    Logs: logsReducer,
})

export default rootReducer
