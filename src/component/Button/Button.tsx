import { faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import { State } from '../../reducer/Tasks'
import './button.css'

/**
 * データのエクスポート
 */
const ExportButton: React.VFC = () => {
	const state = useTaskState()
	return (
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
			<FontAwesomeIcon icon={faFileExport} size="xs" />
			<span className="p-1 text-xs">Export</span>
		</button>
	)
}

/**
 * データのインポート
 */
const ImportButton: React.VFC = () => {
	const dispatch = useTaskDispatch()

	return (
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
			<FontAwesomeIcon icon={faFileImport} size="xs" />
			<span className="p-1 text-xs">Import</span>
		</button>
	)
}

export { ExportButton, ImportButton }
