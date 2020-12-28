import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import bookReducer from '../redux/reducers/bookReducer'

const rootReducer = combineReducers({
    book: bookReducer
})

const middleware = composeWithDevTools(applyMiddleware(thunk))

export default createStore(rootReducer, middleware)