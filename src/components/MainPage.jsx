import React, { useEffect, useRef } from 'react'
import { setCharacterList, setGameId } from '../store/game/actions'
import { setPageOpened, setWsId } from '../store/websocket/actions'
import { connect } from 'react-redux'
import { sendToServer } from '../utils/WebSocket'
import { setCharacterId } from '../store/player/actions'

const MainPage = ({
  order,
  player_1,
  player_2,
  gameId,
  characterList,
  setCharacterList,
  setCharacterId,
  setPageOpened,
  setWsId,
  setGameId
}) => {
  const myCharacterId = order === 1 ? player_1 : player_2
  const opponentCharacterId = order === 1 ? player_2 : player_1

  const handleListKeyDown = (e) => {
    if (e.keyCode === 39) {
      sendToServer({ method: 'changeCharacter', gameId, action: 'next' })
    }

    if (e.keyCode === 37) {
      sendToServer({ method: 'changeCharacter', gameId, action: 'previous' })
    }
  }

  useEffect(() => {
    ulRef.current.focus()
  }, [])

  const ulRef = useRef({})

  return (
    <>
      <ul
        onKeyDown={handleListKeyDown}
        style={{ background: 'lightgray', outline: 'none' }}
        tabIndex={0}
        ref={ulRef}
      >
        {characterList.map((character, index) => (
          <li key={index} onClick={(e) => setCharacterId(index)}>
            {character.name}
            {myCharacterId === index && (
              <span>
                <strong>&nbsp; mySelect</strong>
              </span>
            )}
            {opponentCharacterId === index && (
              <span>
                <strong>&nbsp; opponentSelect</strong>
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

const mapStateToProps = ({
  game: { gameId, characterList },
  player: { order, player_1, player_2 }
}) => ({
  order,
  player_1,
  player_2,
  gameId,
  characterList
})

const mapDispatchToProps = {
  setCharacterList,
  setCharacterId,
  setPageOpened,
  setWsId,
  setGameId
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
