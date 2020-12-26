import React, { useEffect, useRef } from 'react'
import { setSelectedId } from '../store/characters/actions'
import { connect } from 'react-redux'

const CreateGame = ({ characterList, selectedCharacterId, setSelectedId }) => {
  useEffect(() => {
    ulRef.current.focus()
  }, [])

  const ulRef = useRef({})

  const handleListKeyDown = (e) => {
    if (e.keyCode === 39) {
      if (selectedCharacterId < characterList.length - 1) {
        setSelectedId(selectedCharacterId + 1)
      }
    }

    if (e.keyCode === 37) {
      if (selectedCharacterId > 0) {
        setSelectedId(selectedCharacterId - 1)
      }
    }
  }

  return (
    <>
      <ul
        onKeyDown={handleListKeyDown}
        style={{ background: 'lightgray', outline: 'none' }}
        tabIndex={0}
        ref={ulRef}
      >
        {characterList.map((character, index) => (
          <li key={index} onClick={(e) => setSelectedId(index)}>
            {character.name}
            {selectedCharacterId === index && (
              <span>
                <strong>&nbsp; selected</strong>
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

const mapStateToProps = ({
  characters: { characterList, selectedCharacterId }
}) => ({
  characterList,
  selectedCharacterId
})

const mapDispatchToProps = {
  setSelectedId
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
