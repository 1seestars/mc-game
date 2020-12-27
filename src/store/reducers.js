import { combineReducers, createStore } from 'redux'
import { gameReducer } from './game/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectingReducer } from './websocket/reducer'

export const rootReducer = combineReducers({
  connecting: connectingReducer,
  game: gameReducer
})

export const store = createStore(rootReducer, composeWithDevTools())
