let db = null
let objectStore = null
let DBOpenReq = indexedDB.open('my_db', 3)

let counts = {} 

DBOpenReq.addEventListener('error', (err) => {
    console.warn(err)
})

DBOpenReq.addEventListener('success', (ev) => {
    // DB has been opened.. after upgradeneeded
    db = ev.target.result
    console.log('success', db)

    // let t = db.transaction(['aliStore'], 'readonly')
    // objectStore = t.objectStore('aliStore')
    
    // objectStore.openCursor().onsuccess = (e) => {
    //     let cursor = e.target.result
    //     if (cursor) {

    //         if (!counts[cursor.value])
    //             counts[cursor.value] = 0

    //         counts[cursor.value]++

    //         cursor.continue()
    //     } else {
    //         console.log('no more entries!')
    //         console.log(counts)
    //     }
    // }
})

DBOpenReq.addEventListener('upgradeneeded', (ev) => {
    db = ev.target.result
    console.log('upraded', db)
    let oldVersion = ev.oldVersion
    let newVersion = ev.newVersion || db.bersion

    console.log('DB updated from version', oldVersion, 'to', newVersion)

    if (!db.objectStoreNames.contains('playerSearches')) {
        objectStore = db.createObjectStore('playerSearches', { autoIncrement: true })
    }

    // db.createObjectStore('foobar')
    // if (db.objectStoreNames.contains('playerSearches')) {
    //     db.deleteObjectStore('playerSearches')
    // }
})