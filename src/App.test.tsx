import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import App from './App'
import * as db from './db/Database'

// App test
describe('renders App', () => {
	it('render buttons', () => {
		// button title
		render(<App />)
		expect(screen.getByText('Export')).toBeInTheDocument()
		expect(screen.getByText('Import')).toBeInTheDocument()
		expect(screen.getByText(/行追加/i)).toBeInTheDocument()
		expect(screen.getByText(/行削除/i)).toBeInTheDocument()
	})
	it('<Title />', () => {
		// title
		render(<App />)
		const inputs1 = screen.getAllByLabelText('input-text')
		expect(inputs1.length).toBe(1)

		// event: add row
		fireEvent.click(screen.getByText(/行追加/i))
		const inputs2 = screen.getAllByLabelText('input-text')
		expect(inputs2.length).toBe(2)

		// event: delete row
		fireEvent.click(screen.getByText(/行削除/i))
		const inputs3 = screen.getAllByLabelText('input-text')
		expect(inputs3.length).toBe(1)

		// input: display 'test'
		const input = inputs1[0]
		fireEvent.change(input, { target: { value: 'test' } })
		expect(screen.getByDisplayValue('test')).toBeInTheDocument()

		// change input: 'test' -> 'hello world'
		fireEvent.change(input, { target: { value: 'hello world' } })
		expect(screen.getByDisplayValue('hello world')).toBeInTheDocument()
	})
	it('<Title />', () => {
		const { asFragment } = render(<App />)
		expect(asFragment).toMatchSnapshot()
	})
})

// DB test
describe('Test IndexedDB', () => {
	describe('Write and read data', () => {
		it('task entities', async () => {
			const object = {
				id: [0, 1, 2],
				entities: {
					key0: {
						id: '0',
						row: 0,
						title: 'タイトル',
					},
				},
			}
			const key: db.dbKey = '0'
			await db.write(key, object)
			const ret = await db.read(key)
			expect(ret).toEqual(object)
			const ret2 = await db.read(key)
			expect(ret2).toEqual(object)
			db.close()
		})
	})
})
