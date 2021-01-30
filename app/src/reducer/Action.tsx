export type Action =
	| {
			// 処理年月の変更
			type: 'yearMonth'
			yearMonth: string
	  }
	| {
			// 初期化
			type: 'init'
			yearMonth: string
	  }
	| {
			// 行毎のタイトル変更
			type: 'title'
			id: string
			title: string
	  }
	| {
			// 特定タスク、当該日付のタスクON/OFF
			type: 'task'
			id: string
			column: number
	  }
	| {
			// 行追加
			type: 'addRow'
			// id: string
	  }
	| {
			// 行削除
			type: 'deleteRow'
	  }
