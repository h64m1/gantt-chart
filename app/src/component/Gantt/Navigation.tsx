import React from 'react'
import { Validation } from '../../reducer/Tasks'
import { ExportButton, ImportButton } from '../Button/Button'
import { Select } from '../Select/Select'

type NavigationProps = {
	beginDate: string
	endDate: string
	validation: Validation
}

/**
 * ナビゲーション
 */
const Navigation: React.FC<NavigationProps> = React.memo((props) => {
	return (
		<>
			<Select beginDate={props.beginDate} endDate={props.endDate} validation={props.validation} />
			<ExportButton />
			<div className="my-1" />
			<ImportButton />
		</>
	)
})

Navigation.displayName = 'Navigation'

export { Navigation }
