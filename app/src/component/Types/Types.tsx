// state type

export type Task = {
	row: number
	title: string
	taskStatus: Array<boolean>
}

export type State = {
	yearMonth: string
	tasks: Array<Task>
}

export type Action =
	| {
			// 処理年月の変更
			type: 'yearMonth'
			yearMonth: string
	  }
	| {
			// 初期化
			type: 'init'
	  }
	| {
			// 行毎のタイトル変更
			type: 'title'
			index: number
			title: string
	  }
	| {
			// 特定タスク、当該日付のタスクON/OFF
			type: 'task'
			row: number
			column: number
	  }
	| {
			// 行追加
			type: 'addRow'
			index: number
	  }
	| {
			// 行削除
			type: 'deleteRow'
	  }
