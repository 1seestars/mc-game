import React from 'react'
import { sendToServer } from '../utils/WebSocket'
import { connect } from 'react-redux'
import { URL } from '../utils/constants'
import { setCopyButtonValue } from '../store/game/actions'

const StartPage = ({ gameId, copyButtonValue, setCopyButtonValue }) => {
  const copyInvitationURL = () => {
    navigator.clipboard
      .writeText(URL + gameId)
      .then(() => {
        setCopyButtonValue('Copied')
        setTimeout(() => {
          setCopyButtonValue('Copy invitation link')
        }, 2000)
      })
      .catch((err) => alert(err))
  }

  return (
    <>
      {gameId ? (
        <button onClick={copyInvitationURL}>{copyButtonValue}</button>
      ) : (
        <button onClick={() => sendToServer({ method: 'create' })}>
          {' '}
          start
        </button>
      )}
    </>
  )
}

const mapStateToProps = ({ game: { gameId, copyButtonValue } }) => ({
  gameId,
  copyButtonValue
})

const mapDispatchToProps = {
  setCopyButtonValue
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage)
