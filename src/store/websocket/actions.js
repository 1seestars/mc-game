export const SET_PAGE_OPENED = 'SET_PAGE_OPENED'
export const SET_WS_ID = 'SET_WS_ID'

export const setPageOpened = (page) => ({
  type: SET_PAGE_OPENED,
  payload: page
})

export const setWsId = (id) => ({
  type: SET_WS_ID,
  payload: id
})
