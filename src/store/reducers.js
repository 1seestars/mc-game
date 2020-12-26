import { combineReducers, createStore } from 'redux'
import { charactersReducer } from './characters/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export const rootReducer = combineReducers({
  characters: charactersReducer
})

export const store = createStore(rootReducer, composeWithDevTools())
