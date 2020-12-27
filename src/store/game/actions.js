export const SET_SELECTED_ID = 'SET_SELECTED_ID'
export const SET_GAME_ID = 'SET_GAME_ID'
export const SET_COPY_BUTTON_VALUE = 'SET_COPY_BUTTON_VALUE'

export const setSelectedId = (id) => ({
  type: SET_SELECTED_ID,
  payload: id
})

export const setGameId = (id) => ({
  type: SET_GAME_ID,
  payload: id
})

export const setCopyButtonValue = (value) => ({
  type: SET_COPY_BUTTON_VALUE,
  payload: value
})
