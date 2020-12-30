import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { sendToServer } from '../utils/WebSocket'
import { Background } from '../styled/Background'
import styled from 'styled-components'
import background from '../assets/images/background.jpg'
import avatar from '../assets/images/hero_pic.jpg'

const CharacterList = styled.ul`
  max-width: 100%;
  list-style: none;
  padding: 0;
  text-align: center;
  outline: none;
  width: 96%;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 20px;
  box-shadow: 0px 0px 37px 5px rgba(0, 0, 0, 0.75);
  z-index: 10;
`

const CharacterItem = styled.li`
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 7px 10px;
  border-radius: 10px;
  background-image: url(${avatar});
  background-size: 100%;
  opacity: ${({ opacity }) => (opacity ? opacity : '0.5')};
  transition: 0.1s;
  box-sizing: border-box;
  border: ${({ border }) => (border ? `2px solid ${border}` : 'none')};
`

const PlayersWrapper = styled.div`
  display: block;
  width: 100%;
`

const PlayerSign = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  color: white;
  font-size: 30vw;
  position: relative;
  top: 15rem;
  opacity: 0.5;
`

const ReadyLabel = styled.div`
  font-size: 50px;
  position: relative;
  top: 5rem;
  color: orange;
`

const FirstGamePage = ({
  player_1,
  player_2,
  gameId,
  characterList,
  isReady_1,
  isReady_2
}) => {
  const handleListKeyDown = (e) => {
    if (e.keyCode === 39) {
      sendToServer({ method: 'changeCharacter', gameId, action: 'next' })
    }

    if (e.keyCode === 37) {
      sendToServer({ method: 'changeCharacter', gameId, action: 'previous' })
    }

    if (e.keyCode === 13) {
      sendToServer({ method: 'ready', gameId })
    }
  }

  const handleListClick = (id) => {
    sendToServer({ method: 'changeCharacter', gameId, id })
  }

  const ulRef = useRef()

  useEffect(() => {
    ulRef.current.focus()
  }, [])

  return (
    <>
      <Background image={background}>
        <PlayersWrapper>
          <PlayerSign>
            {isReady_1 && <ReadyLabel>Ready</ReadyLabel>}
            <span>P</span>
            <span style={{ color: 'rgba(165, 4, 4, 0.5)' }}>1</span>
          </PlayerSign>
          <PlayerSign>
            {isReady_2 && <ReadyLabel>Ready</ReadyLabel>}
            <span>P</span>
            <span style={{ color: 'rgba(4, 45, 165, 0.5)' }}>2</span>
          </PlayerSign>
        </PlayersWrapper>
        <CharacterList onKeyDown={handleListKeyDown} tabIndex={0} ref={ulRef}>
          {characterList.map((character, index) => {
            let borderColor
            let opacity = 1

            if (player_1 === index && player_2 === index) {
              borderColor = 'grey'
            } else if (player_1 === index) {
              borderColor = 'rgba(165, 4, 4, 0.8)'
            } else if (player_2 === index) {
              borderColor = 'rgba(4, 45, 165, 0.8)'
            } else {
              opacity = 0
            }

            return (
              <CharacterItem
                key={index}
                onClick={(e) => handleListClick(index)}
                border={borderColor}
                opacity={opacity}
              />
            )
          })}
        </CharacterList>
      </Background>
    </>
  )
}

const mapStateToProps = ({
  game: { gameId, characterList },
  player: { player_1, player_2, isReady_1, isReady_2 }
}) => ({
  player_1,
  player_2,
  isReady_1,
  isReady_2,
  gameId,
  characterList
})

export default connect(mapStateToProps, null)(FirstGamePage)
