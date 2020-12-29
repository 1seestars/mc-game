import { combineReducers, createStore } from 'redux'
import { gameReducer } from './game/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectingReducer } from './websocket/reducer'
import { playerReducer } from './player/reducer'

export const rootReducer = combineReducers({
  connecting: connectingReducer,
  game: gameReducer,
  player: playerReducer
})

export const store = createStore(rootReducer, composeWithDevTools())
