import React from 'react'
import { Days } from './Day'

function Gantt(props: Object) {
	return <GanttTable {...props} />
}

function GanttTable(props: Object) {
	return (
		<table>
			<thead>{GanttHead(props)}</thead>
			<tbody>{GanttBody(props)}</tbody>
			<tfoot></tfoot>
		</table>
	)
}

function GanttHead(props: Object) {
	const dates = Days('2020-10-01', { format: 'DD (ddd)' })
	const rows = dates.map((v, i) => {
		return <td key={`head${i}`}>{v}</td>
	})

	return <tr key={0}>{rows}</tr>
}

function GanttBody(props: Object) {
	return <tr></tr>
}

export default Gantt
