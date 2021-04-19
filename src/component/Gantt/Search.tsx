import React from 'react'
import { useTaskDispatch } from '../../context/TaskContext'
import './search.css'

/**
 * 検索用パネル
 */
const Search: React.VFC = () => {
	const dispatch = useTaskDispatch()

	return (
		<>
			{/* 行追加、行削除のボタン */}
			<div className={'gantt-button'}>
				<button className="row-btn row-btn-blue" onClick={() => dispatch({ type: 'addRow' })}>
					行追加
				</button>
				<span className="ml-1 mr-1"></span>
				<button className="row-btn row-btn-blue" onClick={() => dispatch({ type: 'deleteRow' })}>
					行削除
				</button>
			</div>
		</>
	)
}

export { Search }
