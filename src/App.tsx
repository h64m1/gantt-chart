import React from 'react'
import './App.css'
import GanttApp from './component/Gantt/GanttApp'
import { TaskProvider } from './context/TaskContext'

const App: React.VFC = () => {
	return (
		<div className="App">
			<TaskProvider>
				<GanttApp />
			</TaskProvider>
		</div>
	)
}

export default App
