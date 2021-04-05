import { combineReducers } from 'redux'

import authReducer from './Auth'
import messageReducer from './Message'

const rootReducer = combineReducers({
    Auth: authReducer,
    Message: messageReducer,
})

export default rootReducer
