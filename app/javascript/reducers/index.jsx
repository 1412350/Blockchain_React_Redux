import { combineReducers } from 'redux'
import reducer from './reducer'
import transactions from './transactions'
const rootReducer = combineReducers({
    reducer,
    transactions
})

export default rootReducer