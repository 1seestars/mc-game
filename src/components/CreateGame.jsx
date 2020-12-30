import React, { useEffect } from 'react'
import { setCharacterList, setGameId } from '../store/game/actions'
import { connect } from 'react-redux'
import { ws } from '../utils/WebSocket'
import { setPageOpened, setWsId } from '../store/websocket/actions'
import ConnectingPage from './ConnectingPage'
import StartPage from './StartPage'
import ReadyPage from './ReadyPage'
import FirstGamePage from './FirstGamePage'
import {
  setCharacterId,
  setPlayer,
  setPlayerReady
} from '../store/player/actions'
import SecondGamePage from './SecondGamePage'

const CreateGame = ({
  pageOpened,
  setCharacterList,
  setPageOpened,
  setWsId,
  setGameId,
  setPlayer,
  setCharacterId,
  setPlayerReady
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

      if (res.message && res.message === 'ready') {
        setPlayerReady({
          player_1: res.player_1,
          player_2: res.player_2
        })
      }

      if (res.message && res.message === 'nextPage') {
        setPageOpened('SecondGamePage')
      }
    }
  }, [])

  return (
    <>
      {pageOpened === 'Connecting' && <ConnectingPage />}
      {pageOpened === 'StartPage' && <StartPage />}
      {pageOpened === 'ReadyPage' && <ReadyPage />}
      {pageOpened === 'FirstGamePage' && <FirstGamePage />}
      {pageOpened === 'SecondGamePage' && <SecondGamePage />}
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
  setCharacterId,
  setPlayerReady
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
