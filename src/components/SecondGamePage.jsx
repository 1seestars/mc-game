import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Background } from '../styled/Background'
import vs_screen from '../assets/images/vs_screen.jpg'
import styled from 'styled-components'
import { sendToServer, ws } from '../utils/WebSocket'
import { setVsScreenIcons } from '../store/game/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

const IconsList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
`

const IconItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border: 5px solid darkgray;
  border-right: none;
  &:last-child {
    border-right: 5px solid darkgray;
  }
`

const SecondGamePage = ({ gameId, vsScreenIcons, setVsScreenIcons }) => {
  const ulRef = useRef()

  useEffect(() => {
    sendToServer({ method: 'getVsScreenIcons', gameId })

    ws.onmessage = (response) => {
      const res = JSON.parse(response.data)

      if (
        res.message &&
        (res.message === 'changedIcon' || res.message === 'setVsScreenIcons')
      ) {
        setVsScreenIcons(res.icons)
      }
    }

    ulRef.current.focus()
  }, [])

  const handleListKeyDown = (e) => {
    sendToServer({ method: 'changeVsScreenIcon', gameId, keyCode: e.keyCode })
  }

  return (
    <>
      <Background image={vs_screen}>
        <IconsList onKeyDown={handleListKeyDown} tabIndex={0} ref={ulRef}>
          {vsScreenIcons.length &&
            vsScreenIcons.map((icon, index) => (
              <IconItem key={index}>
                {icon.isShown && (
                  <FontAwesomeIcon
                    icon={faGamepad}
                    size={'3x'}
                    color={'white'}
                  />
                )}
              </IconItem>
            ))}
        </IconsList>
      </Background>
    </>
  )
}

const mapStateToProps = ({ game: { gameId, vsScreenIcons } }) => ({
  gameId,
  vsScreenIcons
})

const mapDispatchToProps = {
  setVsScreenIcons
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondGamePage)
