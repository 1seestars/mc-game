import { SET_CHARACTER_ID, SET_PLAYER, SET_PLAYER_READY } from './actions.js'

const initialState = {
  order: null,
  player_1: 0,
  player_2: 0,
  isReady_1: false,
  isReady_2: false
}

export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARACTER_ID:
      return {
        ...state,
        player_1: action.payload.player_1,
        player_2: action.payload.player_2
      }
    case SET_PLAYER_READY:
      return {
        ...state,
        isReady_1: action.payload.player_1,
        isReady_2: action.payload.player_2
      }
    case SET_PLAYER:
      return {
        ...state,
        order: action.payload
      }
    default:
      return state
  }
}
