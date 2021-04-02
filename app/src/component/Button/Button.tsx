import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import { State } from '../../reducer/Tasks'
import './button.css'

/**
 * データのエクスポート
 */
const ExportButton: React.FC = () => {
	const state = useTaskState()
	return (
		<div>
			<button
				className="data-btn data-btn-blue"
				onClick={async (event) => {
					console.debug('click export ...', event, state)
					try {
						window.api.export(state)
					} catch (e) {
						console.debug('error: cannot find window.api')
					}
				}}
			>
				<FontAwesomeIcon icon={faFileExport} className="button-icon" />
				エクスポート
			</button>
		</div>
	)
}

/**
 * データのインポート
 */
const ImportButton: React.FC = () => {
	const dispatch = useTaskDispatch()

	return (
		<div>
			<button
				className="data-btn data-btn-blue"
				onClick={async () => {
					try {
						const data = (await window.api.import()) as State
						console.debug('ImportButton: import', data)

						// DBに登録
						return dispatch({ type: 'importJson', data: data })
					} catch (e) {
						console.debug('error: cannot find window.api')
					}
				}}
			>
				<FontAwesomeIcon icon={faFileExport} className="button-icon" />
				インポート
			</button>
		</div>
	)
}

export { ExportButton, ImportButton }
