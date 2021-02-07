import { Today } from '../component/Date/Day'

require('fake-indexeddb/auto')

const VERSION = 1
const NAME = 'ganttDb'
const STORE = 'gantt'
const READ = 'readonly'
const WRITE = 'readwrite'

export type dbKey = string

type Record = {
	key: dbKey
	data: unknown
}

let _db: IDBDatabase

/**
 * DBを取得
 * @param event db versionが変わった場合のevent
 */
const getResult = (event: Event): unknown => {
	// IDBOpenDBRequestでキャストしないとresultが取得できない
	return (event.target as IDBOpenDBRequest).result
}

const dbCreate = (): Promise<IDBDatabase> =>
	new Promise<IDBDatabase>((resolve, reject) => {
		const openRequest = indexedDB.open(NAME, VERSION)
		openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
			const db = getResult(event) as IDBDatabase
			db.createObjectStore(STORE, {
				keyPath: 'key',
			})
		}

		openRequest.onsuccess = (event: Event) => resolve(getResult(event) as IDBDatabase)
		openRequest.onerror = () => reject(new Error('Error: Indexeddbを開けません'))
	})

const dbGet = (db: IDBDatabase, key: string): Promise<Record> =>
	new Promise<Record>((resolve, reject) => {
		const transaction = db.transaction(STORE, READ)
		const store = transaction.objectStore(STORE)
		const request = store.get(key)

		request.onsuccess = (event: Event) => resolve(getResult(event) as Record)
		request.onerror = () => reject(new Error('Error: Indexeddbからget失敗'))
	})

const dbPut = (db: IDBDatabase, record: Record): Promise<Record> =>
	new Promise<Record>((resolve, reject) => {
		const transaction = db.transaction(STORE, WRITE)
		const store = transaction.objectStore(STORE)
		const request = store.put(record)

		request.onsuccess = () => resolve(record)
		request.onerror = () => reject(new Error('Error: Indexeddbへのput失敗'))
	})

/**
 * DBへの登録
 * @param key {dbKey} レコードを書き出すキー
 * @param data DBレコード
 */
export const write = async (key: dbKey, data: unknown): Promise<boolean> => {
	try {
		if (_db === undefined) {
			console.debug('write: create DB')
			_db = await dbCreate()
		} else {
			console.debug('write: use existing DB')
		}
		await dbPut(_db, { key: key, data })
		console.debug('write | key', key, 'data', data)

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

/**
 * DBからの取り出し、export用に全レコードを取得
 */
export const readAll = async (): Promise<unknown> => {
	try {
		if (_db === undefined) {
			console.debug('read: create DB')
			_db = await dbCreate()
		} else {
			console.debug('read: use existing DB')
		}

		const thisYear = Today({ format: 'YYYY' })
		const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		const yearMonths: Array<string> = []
		months.forEach((value) => {
			const month = `${value}`
			const yearMonth = `${thisYear}-${month.padStart(2, `0`)}-01`
			yearMonths.push(yearMonth)
		})

		const data: Array<unknown> = []
		await Promise.all(
			yearMonths.map(async (item) => {
				const record = await dbGet(_db, item)
				const isRecordEmpty = record === null || record === undefined
				if (!isRecordEmpty) {
					data.push(record)
				}
			}),
		)

		console.debug('read | data', data)
		return data
	} catch (error) {
		console.error(error)
		return null
	}
}

/**
 * DBからの取り出し
 * @param key {dbKey} レコードを取り出すキー
 */
export const read = async (key: dbKey): Promise<unknown> => {
	try {
		if (_db === undefined) {
			console.debug('read: create DB')
			_db = await dbCreate()
		} else {
			console.debug('read: use existing DB')
		}
		const record = await dbGet(_db, key)
		if (record === null || record === undefined) {
			return null
		}

		console.debug('read | key', key, 'data', record)
		return record.data
	} catch (error) {
		console.error(error)
		return null
	}
}

/**
 * DBをclose
 */
export const close = (): void => {
	if (_db === undefined) {
		return
	}

	console.debug('close: close DB')
	return _db.close()
}
