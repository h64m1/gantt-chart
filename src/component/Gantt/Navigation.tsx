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
const Navigation: React.VFC<NavigationProps> = React.memo((props) => {
	return (
		<>
			<div className="h-8 flex flex-wrap place-content-center m-1">
				<div className="p-1">
					<ExportButton />
				</div>
				<div className="p-1">
					<ImportButton />
				</div>
			</div>
			<Select beginDate={props.beginDate} endDate={props.endDate} validation={props.validation} />
		</>
	)
})

Navigation.displayName = 'Navigation'

export { Navigation }
