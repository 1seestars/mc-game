import { SET_SELECTED_ID } from './actions.js'

const persList = Array(28).fill({
  name: 'test'
})

const initialState = {
  characterList: persList,
  selectedCharacterId: 0
}

export const charactersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ID:
      return {
        ...state,
        selectedCharacterId: action.payload
      }

    default:
      return state
  }
}
