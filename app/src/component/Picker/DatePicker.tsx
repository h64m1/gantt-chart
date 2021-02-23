import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './datepicker.scss'

/**
 * DatePickerを表示
 */
const DatePicker: React.FC<{
	date: string | undefined
	dateFormat: string
	onChange: (date: Date) => void
	className?: string
}> = ({ date, dateFormat, onChange, className }) => {
	console.debug('DatePicker: date', date, 'format', dateFormat)
	const _date = date === undefined ? date : new Date(date)

	return <ReactDatePicker className={className} dateFormat={dateFormat} selected={_date} onChange={onChange} />
}

export { DatePicker }
