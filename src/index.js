import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { store } from './store/reducers'
import Root from './routing/Root'

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
