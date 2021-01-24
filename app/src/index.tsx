import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	// React.StrictModeだとreducerが必ず2回呼び出されるため、booleanの変更判定がうまく動作しない
	// <React.StrictMode>
	// </React.StrictMode>,
	<App />,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
