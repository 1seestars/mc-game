export const SET_PLAYER = 'SET_PLAYER'
export const SET_CHARACTER_ID = 'SET_CHARACTER_ID'

export const setPlayer = (num) => ({
  type: SET_PLAYER,
  payload: num
})

export const setCharacterId = (ids) => ({
  type: SET_CHARACTER_ID,
  payload: ids
})
