import React from 'react'

export function Send(): void {
	React.useEffect(() => {
		const test = () => {
			console.debug('Send | start load ...')

			try {
				const messages = window.api.send('ping')
				console.debug(`success send api | message: ${messages}`)
			} catch (e) {
				// cannot call window.api without electron
				console.debug('error: load failed')
			}
		}
		test()
	}, [])
}
