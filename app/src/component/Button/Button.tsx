import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import { State } from '../../reducer/Tasks'
import './button.scss'

/**
 * データのエクスポート
 */
const ExportButton: React.FC = () => {
	const state = useTaskState()
	return (
		<div className="export">
			<span
				className="export-button"
				onClick={async (event) => {
					console.debug('click export ...', event, state)
					try {
						window.api.export(state)
					} catch (e) {
						console.debug('error: cannot find window.api')
					}
				}}
			>
				<FontAwesomeIcon icon={faFileExport} className="export-icon" />
				エクスポート
			</span>
		</div>
	)
}

/**
 * データのインポート
 */
const ImportButton: React.FC = () => {
	const dispatch = useTaskDispatch()

	return (
		<div className="import">
			<span
				className="import-button"
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
				<FontAwesomeIcon icon={faFileExport} className="import-icon" />
				インポート
			</span>
		</div>
	)
}

export { ExportButton, ImportButton }
