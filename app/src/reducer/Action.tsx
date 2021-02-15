import { Tasks } from './Tasks'

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
			tasks: Tasks
	  }
	| {
			// 行毎のタイトル変更
			type: 'title'
			id: string
			title: string
	  }
	| {
			// 行毎のタスク背景色の変更
			type: 'color'
			id: string
			color: string
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
	  }
	| {
			// 行削除
			type: 'deleteRow'
	  }
	| {
			// ローカルファイルのインポート
			type: 'importJson'
			data: Array<{
				key: string
				value: unknown
			}>
	  }
