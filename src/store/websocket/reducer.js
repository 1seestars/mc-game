import { SET_PAGE_OPENED, SET_WS_ID } from './actions.js'

const initialState = {
  wsId: '',
  pageOpened: 'Connecting'
}

export const connectingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE_OPENED:
      return {
        ...state,
        pageOpened: action.payload
      }
    case SET_WS_ID:
      return {
        ...state,
        wsId: action.payload
      }
    default:
      return state
  }
}
