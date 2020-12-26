import React, { useState, useEffect, useRef } from 'react'

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(0)
  const [characterList, setCharacterList] = useState(
    Array(28).fill({
      name: 'test'
    })
  )

  useEffect(() => {
    ulRef.current.focus()
  }, [])

  const ulRef = useRef({})

  const handleListKeyDown = (e) => {
    if (e.keyCode === 39) {
      if (selectedCharacterId < characterList.length - 1) {
        setSelectedCharacterId(selectedCharacterId + 1)
      }
    }

    if (e.keyCode === 37) {
      if (selectedCharacterId > 0) {
        setSelectedCharacterId(selectedCharacterId - 1)
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
          <li key={index} onClick={(e) => setSelectedCharacterId(index)}>
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

export default App
