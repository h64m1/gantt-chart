import { State } from '../../reducer/Tasks'
import * as Day from '../Date/Day'

type ValidationType = 'beginDate' | 'endDate'

const validate = (state: State, type: ValidationType): string => {
	switch (type) {
		case 'beginDate':
			return validateBeginDate(state)
		case 'endDate':
			return validateEndDate(state)
	}
}

/**
 * カレンダー開始日のバリデーション
 * @param {State} state ステート
 */
function validateBeginDate(state: State): string {
	// 開始日 < 終了日となっていること
	const begin = Day.Day(state.beginDate)
	const end = Day.Day(state.endDate)
	if (begin.isAfter(end)) {
		return '開始日は終了日以前の日付を設定して下さい'
	}

	// validation ok
	return ''
}

/**
 * カレンダー終了日のバリデーション
 * @param {State} state ステート
 */
function validateEndDate(state: State): string {
	// 開始日 < 終了日となっていること
	const begin = Day.Day(state.beginDate)
	const end = Day.Day(state.endDate)
	if (end.isBefore(begin)) {
		return '終了日は開始日以後の日付を設定して下さい'
	}

	// validation ok
	return ''
}

export { validate }
