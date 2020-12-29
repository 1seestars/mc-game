import React, { useState } from 'react'
import { setPageOpened } from '../store/websocket/actions'
import { connect } from 'react-redux'

const ReadyPage = ({ setPageOpened }) => {
  const [count, setCount] = useState(3)

  const pageToReturn = () => {
    const timeout = setTimeout(() => {
      if (count === 1) {
        setCount('GO')
        return
      }

      if (count === 'GO') {
        setPageOpened('MainPage')
        setCount(3)
        clearTimeout(timeout)
      }
      setCount(count - 1)
    }, 1000)

    return count
  }

  return (
    <>
      <div>{pageToReturn()}</div>
    </>
  )
}

const mapDispatchToProps = {
  setPageOpened
}

export default connect(null, mapDispatchToProps)(ReadyPage)
