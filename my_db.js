let db = null
let objectStore = null
let DBOpenReq = indexedDB.open('my_db', 3)

let counts = {} 

DBOpenReq.addEventListener('error', (err) => {
    console.warn(err)
})

let updateRecentSearches = (db) => {
    console.log('updatingSearches')
    let t = db.transaction(['playerSearches'], 'readonly')
    objectStore = t.objectStore('playerSearches')

    const searchList = document.querySelector('#searchList')
    searchList.innerHTML = ''

    objectStore.openCursor().onsuccess = (e) => {
        let cursor = e.target.result
        if (cursor) {

            const li = document.createElement('li')
            li.classList.add("mdc-list-item")
            const firstSpan = document.createElement('span')
            firstSpan.classList.add("mdc-list-item__ripple")
            const secSpan = document.createElement('span')
            secSpan.classList.add("mdc-list-item__text")
            secSpan.innerHTML = `${cursor.value}`
            li.appendChild(firstSpan)
            li.appendChild(secSpan)

            searchList.appendChild(li)

            console.log(li)

            console.log(cursor.value)

            /*
            <li class="mdc-list-item" tabindex="0">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">Single-line item</span>
            </li>
            */

            cursor.continue()
        } else {
            console.log('no more entries!')
            console.log(counts)
        }
    }
}

DBOpenReq.addEventListener('success', (ev) => {
    // DB has been opened.. after upgradeneeded
    db = ev.target.result
    console.log('success', db)

    updateRecentSearches

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