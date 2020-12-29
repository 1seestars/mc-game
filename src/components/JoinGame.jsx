import React, { useEffect } from 'react'
import { withRouter } from 'react-router'
import { setCharacterList, setGameId } from '../store/game/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sendToServer, ws } from '../utils/WebSocket'
import { setPageOpened } from '../store/websocket/actions'
import ReadyPage from './ReadyPage'
import MainPage from './MainPage'
import GameNotFoundPage from './GameNotFoundPage'
import { setCharacterId, setPlayer } from '../store/player/actions'

const JoinGame = ({
  order,
  match,
  pageOpened,
  setGameId,
  setPageOpened,
  setCharacterList,
  setPlayer,
  setCharacterId
}) => {
  useEffect(() => {
    ws.onopen = () => {
      sendToServer({ method: 'join', invitationId: match.params.id })
    }

    ws.onmessage = (response) => {
      const res = JSON.parse(response.data)

      if (res.message && res.message === 'confirmed') {
        setGameId(res.gameId)
        setCharacterList(res.characterList)
        setPageOpened('ReadyPage')
        setPlayer(2)
      }

      if (res.message && res.message === 'noGameFound') {
        setPageOpened('GameNotFoundPage')
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
      {pageOpened === 'ReadyPage' && <ReadyPage />}
      {pageOpened === 'MainPage' && <MainPage />}
      {pageOpened === 'GameNotFoundPage' && <GameNotFoundPage />}
    </>
  )
}

const mapStateToProps = ({
  connecting: { pageOpened },
  player: { order }
}) => ({
  order,
  pageOpened
})

const mapDispatchToProps = {
  setGameId,
  setCharacterList,
  setPageOpened,
  setPlayer,
  setCharacterId
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(JoinGame)
