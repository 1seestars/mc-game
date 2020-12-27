import React, { useEffect } from 'react'
import { withRouter } from 'react-router'
import { setGameId } from '../store/game/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sendToServer, ws } from '../utils/WebSocket'

const JoinGame = ({ match, gameId, setGameId }) => {
  useEffect(() => {
    ws.onmessage = (response) => {
      const res = JSON.parse(response.data)

      if (res.message && res.message === 'confirmed') {
        alert('confirmed')
      }
    }

    setGameId(match.params.id)
    sendToServer({ method: 'join', invitationId: match.params.id })
  }, [])

  return <div>Join game page</div>
}

const mapStateToProps = ({ game: { gameId } }) => ({
  gameId
})

const mapDispatchToProps = {
  setGameId
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(JoinGame)
