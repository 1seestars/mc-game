import React, { useEffect } from 'react'
import { withRouter } from 'react-router'
import { setCharacterList, setGameId } from '../store/game/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sendToServer, ws } from '../utils/WebSocket'
import { setPageOpened } from '../store/websocket/actions'
import ReadyPage from './ReadyPage'
import FirstGamePage from './FirstGamePage'
import GameNotFoundPage from './GameNotFoundPage'
import {
  setCharacterId,
  setPlayer,
  setPlayerReady
} from '../store/player/actions'
import SecondGamePage from './SecondGamePage'

const JoinGame = ({
  match,
  pageOpened,
  setGameId,
  setPageOpened,
  setCharacterList,
  setPlayer,
  setCharacterId,
  setPlayerReady
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
      {pageOpened === 'ReadyPage' && <ReadyPage />}
      {pageOpened === 'FirstGamePage' && <FirstGamePage />}
      {pageOpened === 'GameNotFoundPage' && <GameNotFoundPage />}
      {pageOpened === 'SecondGamePage' && <SecondGamePage />}
    </>
  )
}

const mapStateToProps = ({ connecting: { pageOpened } }) => ({
  pageOpened
})

const mapDispatchToProps = {
  setGameId,
  setCharacterList,
  setPageOpened,
  setPlayer,
  setCharacterId,
  setPlayerReady
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(JoinGame)
