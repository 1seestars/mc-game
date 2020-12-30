import {
  SET_CHARACTER_LIST,
  SET_GAME_ID,
  SET_COPY_BUTTON_VALUE,
  SET_VS_SCREEN_ICONS
} from './actions.js'

const initialState = {
  copyButtonValue: 'Copy invitation link',
  gameId: '',
  characterList: [],
  vsScreenIcons: []
}

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARACTER_LIST:
      return {
        ...state,
        characterList: action.payload
      }
    case SET_GAME_ID:
      return {
        ...state,
        gameId: action.payload
      }
    case SET_VS_SCREEN_ICONS:
      return {
        ...state,
        vsScreenIcons: action.payload
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
