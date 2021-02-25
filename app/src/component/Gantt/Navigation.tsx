import React from 'react'
import { Validation } from '../../reducer/Tasks'
import { ExportButton, ImportButton } from '../Button/Button'
import { Select } from '../Select/Select'

/**
 * ナビゲーション
 */
const Navigation: React.FC<{
	beginDate: string
	endDate: string
	validation: Validation
}> = React.memo(({ beginDate, endDate, validation }) => {
	return (
		<nav id="navigation">
			<Select beginDate={beginDate} endDate={endDate} validation={validation} />
			<ExportButton />
			<ImportButton />
		</nav>
	)
})

Navigation.displayName = 'Navigation'

export { Navigation }
