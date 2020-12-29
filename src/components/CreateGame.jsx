import React, { useEffect, useRef } from 'react'
import { setCharacterList, setGameId } from '../store/game/actions'
import { connect } from 'react-redux'
import { ws } from '../utils/WebSocket'
import { setPageOpened, setWsId } from '../store/websocket/actions'
import ConnectingPage from './ConnectingPage'
import StartPage from './StartPage'
import ReadyPage from './ReadyPage'
import MainPage from './MainPage'
import { setCharacterId, setPlayer } from '../store/player/actions'

const CreateGame = ({
  pageOpened,
  setCharacterList,
  setPageOpened,
  setWsId,
  setGameId,
  setPlayer,
  setCharacterId
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
        setPlayer(1)
      }

      if (res.message && res.message === 'confirmed') {
        setCharacterList(res.characterList)
        setPageOpened('ReadyPage')
      }

      if (res.message && res.message === 'step') {
        setCharacterId({
          player_1: res.player_1,
          player_2: res.player_2
        })
      }
    }
  }, [])

  return (
    <>
      {pageOpened === 'Connecting' && <ConnectingPage />}
      {pageOpened === 'StartPage' && <StartPage />}
      {pageOpened === 'ReadyPage' && <ReadyPage />}
      {pageOpened === 'MainPage' && <MainPage />}
    </>
  )
}

const mapStateToProps = ({ connecting: { pageOpened } }) => ({
  pageOpened
})

const mapDispatchToProps = {
  setCharacterList,
  setPageOpened,
  setWsId,
  setGameId,
  setPlayer,
  setCharacterId
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
