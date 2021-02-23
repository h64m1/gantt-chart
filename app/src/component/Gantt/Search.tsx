import React from 'react'
import { useTaskDispatch } from '../../context/TaskContext'

/**
 * 検索用パネル
 */
const Search: React.FC = () => {
	const dispatch = useTaskDispatch()

	return (
		<>
			{/* 行追加、行削除のボタン */}
			<div className={'gantt-button'}>
				<button onClick={() => dispatch({ type: 'addRow' })}>行追加</button>
				<button onClick={() => dispatch({ type: 'deleteRow' })}>行削除</button>
			</div>
		</>
	)
}

export { Search }
