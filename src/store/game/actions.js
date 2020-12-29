export const SET_CHARACTER_LIST = 'SET_CHARACTER_LIST'
export const SET_GAME_ID = 'SET_GAME_ID'
export const SET_COPY_BUTTON_VALUE = 'SET_COPY_BUTTON_VALUE'

export const setCharacterList = (list) => ({
  type: SET_CHARACTER_LIST,
  payload: list
})

export const setGameId = (id) => ({
  type: SET_GAME_ID,
  payload: id
})

export const setCopyButtonValue = (value) => ({
  type: SET_COPY_BUTTON_VALUE,
  payload: value
})
