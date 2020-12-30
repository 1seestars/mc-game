import React, { useState, useEffect } from 'react'
import { setPageOpened } from '../store/websocket/actions'
import { connect } from 'react-redux'
import { Wrapper } from '../styled/Wrapper'
import styled from 'styled-components'

const Count = styled.div`
  font-size: 7rem;
  font-family: inherit;
  color: rgba(0, 0, 0, 0.6);
  text-shadow: 3px 2px 3px;
`

const ReadyPage = ({ setPageOpened }) => {
  const [count, setCount] = useState(3)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count === 1) {
        setPageOpened('FirstGamePage')
      }
      setCount((prev) => prev - 1)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [count])

  return (
    <>
      <Wrapper>
        <Count>{count}</Count>
      </Wrapper>
    </>
  )
}

const mapDispatchToProps = {
  setPageOpened
}

export default connect(null, mapDispatchToProps)(ReadyPage)
