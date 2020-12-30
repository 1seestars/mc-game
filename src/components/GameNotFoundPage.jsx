import React from 'react'
import styled from 'styled-components'
import { Wrapper } from '../styled/Wrapper'

const NotFoundSign = styled(Wrapper)`
  color: white;
  font-size: 25px;
`

const GameNotFoundPage = () => {
  return (
    <>
      <NotFoundSign>Game not found</NotFoundSign>
    </>
  )
}

export default GameNotFoundPage
