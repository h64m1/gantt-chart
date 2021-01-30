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

export const write = async (key: dbKey, data: unknown): Promise<boolean> => {
	let db: IDBDatabase | null = null

	try {
		db = await dbCreate()
		await dbPut(db, { key: key, data })
		db.close()

		return true
	} catch (error) {
		console.error(error)
		if (db) {
			db.close()
		}
		return false
	}
}

export const read = async (key: dbKey): Promise<unknown> => {
	let db: IDBDatabase | null = null

	try {
		db = await dbCreate()
		const record = await dbGet(db, key)
		db.close()

		return record.data
	} catch (error) {
		console.error(error)
		if (db) {
			db.close()
		}
		return null
	}
}
