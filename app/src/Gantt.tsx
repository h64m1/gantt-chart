import React from 'react'
import Day from './Day'

function Gantt(props: Object) {
	return <GanttTable {...props} />
}

function GanttTable(props: Object) {
	return (
		<table>
			<thead></thead>
			<tbody>{GanttBody(props)}</tbody>
			<tfoot></tfoot>
		</table>
	)
}

function GanttBody(props: Object) {
	// const date = Day({ format: 'YYYY-MM-DD' })
	const date = Day()
	const rows = ['abc', 'def', 'ghi', `${date}`].map((v, i) => {
		return (
			<tr key={`${i}`}>
				<td>{v}</td>
			</tr>
		)
	})

	return rows
}

export default Gantt
