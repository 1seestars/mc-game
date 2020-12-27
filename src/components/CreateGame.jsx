import React, { useEffect, useRef } from 'react'
import {
  setCharacterList,
  setGameId,
  setSelectedId
} from '../store/game/actions'
import { connect } from 'react-redux'
import { ws } from '../utils/WebSocket'
import { setPageOpened, setWsId } from '../store/websocket/actions'
import ConnectingPage from './ConnectingPage'
import StartPage from './StartPage'
import ReadyPage from './ReadyPage'
import MainPage from './MainPage'

const CreateGame = ({
  pageOpened,
  characterList,
  setCharacterList,
  selectedCharacterId,
  setSelectedId,
  setPageOpened,
  setWsId,
  setGameId
}) => {
  useEffect(() => {
    ws.onopen = () => {
      setPageOpened('StartPage')
    }

    ws.onmessage = (response) => {
      const res = JSON.parse(response.data)

      if (res.message && res.message === 'initialization') {
        setWsId(res.id)
      }

      if (res.message && res.message === 'newGame') {
        setGameId(res.gameId)
      }

      if (res.message && res.message === 'confirmed') {
        setCharacterList(res.characterList)
        setPageOpened('ReadyPage')
      }
    }

    // ulRef.current.focus()
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
      {pageOpened === 'Connecting' && <ConnectingPage />}
      {pageOpened === 'StartPage' && <StartPage />}
      {pageOpened === 'ReadyPage' && <ReadyPage />}
      {pageOpened === 'MainPage' && <MainPage />}
    </>
  )
}

const mapStateToProps = ({
  connecting: { pageOpened },
  game: { characterList, selectedCharacterId }
}) => ({
  pageOpened,
  characterList,
  selectedCharacterId
})

const mapDispatchToProps = {
  setCharacterList,
  setSelectedId,
  setPageOpened,
  setWsId,
  setGameId
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)

// <>
// <ul
// onKeyDown={handleListKeyDown}
// style={{ background: 'lightgray', outline: 'none' }}
// tabIndex={0}
// ref={ulRef}
//     >
//     {characterList.map((character, index) => (
//           <li key={index} onClick={(e) => setSelectedId(index)}>
//             {character.name}
//             {selectedCharacterId === index && (
//                 <span>
//                 <strong>&nbsp; selected</strong>
//               </span>
//             )}
//           </li>
//       ))}
// </ul>
// </>
