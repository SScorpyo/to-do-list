import {combineReducers} from '@reduxjs/toolkit'
import { reducer as todoReducer } from '../slices/todos'

const rootReducer=combineReducers({
    todos:todoReducer
})

export default rootReducer