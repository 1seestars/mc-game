export const SET_PLAYER = 'SET_PLAYER'
export const SET_PLAYER_READY = 'SET_PLAYER_READY'
export const SET_CHARACTER_ID = 'SET_CHARACTER_ID'

export const setPlayer = (num) => ({
  type: SET_PLAYER,
  payload: num
})

export const setPlayerReady = (states) => ({
  type: SET_PLAYER_READY,
  payload: states
})

export const setCharacterId = (ids) => ({
  type: SET_CHARACTER_ID,
  payload: ids
})
