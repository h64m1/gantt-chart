import React from 'react'
import * as db from '../../db/Database'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'

/**
 * データのエクスポート
 */
export const ExportButton: React.FC = () => {
	return (
		<div className="export">
			<span
				className="export-button"
				onClick={async (event) => {
					console.debug('click export ...', event)
					try {
						const response = await db.readAll()
						window.api.export(response)
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
export const ImportButton: React.FC = () => {
	return (
		<div className="import">
			<span
				className="import-button"
				onClick={async (event) => {
					console.debug('click import ...', event)
					try {
						const data: Array<{
							key: string
							value: unknown
						}> = await window.api.import()
						console.debug('ImportButton: import', data)
						// DBに登録
						data.forEach((item) => {
							db.write(item.key, item.value)
						})
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
