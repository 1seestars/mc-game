import {
  SET_SELECTED_ID,
  SET_GAME_ID,
  SET_COPY_BUTTON_VALUE
} from './actions.js'

const initialState = {
  copyButtonValue: 'Copy invitation link',
  gameId: '',
  characterList: [],
  selectedCharacterId: 0
}

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ID:
      return {
        ...state,
        selectedCharacterId: action.payload
      }
    case SET_GAME_ID:
      return {
        ...state,
        gameId: action.payload
      }
    case SET_COPY_BUTTON_VALUE:
      return {
        ...state,
        copyButtonValue: action.payload
      }
    default:
      return state
  }
}
