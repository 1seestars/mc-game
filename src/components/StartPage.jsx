import React from 'react'
import { sendToServer } from '../utils/WebSocket'
import { connect } from 'react-redux'
import { URL } from '../utils/constants'
import { setCopyButtonValue } from '../store/game/actions'
import styled from 'styled-components'
import { Wrapper } from '../styled/Wrapper'

const Button = styled.button`
  background: rgba(86, 75, 50, 1);
  border: none;
  color: white;
  padding: 0.3rem 2rem 0.1rem;
  font-size: 25px;
  border-radius: 5px;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 3px 5px 2px #1c1c1c;
  animation: gradient 4s linear infinite;

  @keyframes gradient {
    0% {
      background: rgba(86, 75, 50, 1);
    }

    50% {
      background: rgba(181, 152, 87, 1);
    }

    100% {
      background: rgba(86, 75, 50, 1);
    }
  }
`

const StartPage = ({ gameId, copyButtonValue, setCopyButtonValue }) => {
  const copyInvitationURL = () => {
    navigator.clipboard
      .writeText(URL + gameId)
      .then(() => {
        setCopyButtonValue('Copied')
        setTimeout(() => {
          setCopyButtonValue('Copy invitation link')
        }, 1000)
      })
      .catch((err) => alert(err))
  }

  return (
    <>
      <Wrapper>
        {gameId ? (
          <Button onClick={copyInvitationURL}>{copyButtonValue}</Button>
        ) : (
          <Button onClick={() => sendToServer({ method: 'create' })}>
            Start
          </Button>
        )}
      </Wrapper>
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
