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

const JoinGame = ({
  match,
  pageOpened,
  gameId,
  setGameId,
  setPageOpened,
  setCharacterList
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
      }

      if (res.message && res.message === 'noGameFound') {
        setPageOpened('GameNotFoundPage')
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

const mapStateToProps = ({ game: { gameId }, connecting: { pageOpened } }) => ({
  gameId,
  pageOpened
})

const mapDispatchToProps = {
  setGameId,
  setCharacterList,
  setPageOpened
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(JoinGame)
