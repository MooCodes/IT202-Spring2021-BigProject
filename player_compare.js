// all of the code related to making the get requests to the NBA API
// The API Links
// NBA Stats API:   https://www.quora.com/Is-there-an-NBA-API-for-free-that-has-live-stats
//                  http://data.nba.net/10s/prod/v1/2020/players.json (find any player)
//                  https://data.nba.net/data/10s/prod/v1/2020/players/1628960_profile.json (gets Grayson Allen stats)
// NBA Image API:   https://nba-players.herokuapp.com/

// get the input field refs
const compareButton = document.querySelector('#compare-button')
const leftFirstName = document.querySelector("#left-first-name")
const leftLastName = document.querySelector("#left-last-name")
const rightFirstName = document.querySelector("#right-first-name")
const rightLastName = document.querySelector("#right-last-name")

const handleClickButton = () => {
    // What happens when we click the compare button
    compareButton.addEventListener("click", () => {
        
        console.log(leftFirstName.value, leftLastName.value, rightFirstName.value, rightLastName.value)

        if (leftFirstName.value === "" || leftLastName.value === "" || 
            rightFirstName.value === "" || rightLastName.value === "")
            console.log("error - need to enter something into all inputs")
        else {
            // inputs are non empty, lets try looking up the NBA players
            fetch('http://data.nba.net/10s/prod/v1/2020/players.json')
                .then(res => res.json())
                .then(data => handlePlayerData(data.league.standard))
        }
    })
}

// function that handles the large player data once we get it from request
const handlePlayerData = (players) => {
    let count = 0

    players.forEach(p => {
        if (p.firstName.toLowerCase() == leftFirstName.value.toLowerCase() && 
        p.lastName.toLowerCase() == leftLastName.value.toLowerCase()) {
            console.log('got a match on left')
            count++
            fetch(`https://data.nba.net/data/10s/prod/v1/2020/players/${p.personId}_profile.json`)
                .then(res => res.json())
                .then(data => {
                    let stats = data.league.standard.stats.careerSummary
                    console.log("first player", stats)

                    // set the styles and inner html of the player cards
                    const leftImg = document.querySelector("#left-card")
                    const leftName = document.querySelector("#left-card-name")
                    leftImg.style.backgroundImage = `url(https://nba-players.herokuapp.com/players/${leftLastName.value.toLowerCase()}/${leftFirstName.value.toLowerCase()})`
                    leftName.innerHTML = `${p.firstName} ${p.lastName}`

                    const leftStats = document.querySelector("#left-stats")
                    let statStr = `${stats.ppg} PPG ${stats.rpg} RPG ${stats.apg} APG ${stats.spg} SPG ${stats.bpg} ${stats.fgp}% FG ${stats.tpp}% 3P ${stats.ftp}% FT`
                    leftStats.innerHTML = statStr
                })
        }

        if (p.firstName.toLowerCase() == rightFirstName.value.toLowerCase() &&
            p.lastName.toLowerCase() == rightLastName.value.toLowerCase()) {
            console.log('got a match on right')
            count++
            fetch(`https://data.nba.net/data/10s/prod/v1/2020/players/${p.personId}_profile.json`)
                .then(res => res.json())
                .then(data => {
                    let stats = data.league.standard.stats.careerSummary
                    console.log("second player", data.league.standard.stats.careerSummary)

                    // set the styles and inner html of the player cards
                    const rightImg = document.querySelector("#right-card")
                    const rightName = document.querySelector("#right-card-name")
                    rightImg.style.backgroundImage = `url(https://nba-players.herokuapp.com/players/${rightLastName.value.toLowerCase()}/${rightFirstName.value.toLowerCase()})`
                    rightName.innerHTML = `${p.firstName} ${p.lastName}`

                    const rightStats = document.querySelector("#right-stats")
                    let statStr = `${stats.ppg} PPG ${stats.rpg} RPG ${stats.apg} APG ${stats.spg} SPG ${stats.bpg} ${stats.fgp}% FG ${stats.tpp}% 3P ${stats.ftp}% FT`
                    rightStats.innerHTML = statStr
                })
        }
    })

    if (count == 2) {
        console.log('found both players')
        // display the data
        const cards = document.querySelector("#player-cards")
        cards.style.display = "block";

        // add to search history DB
        console.log('adding these players to search history db')

        let transaction = db.transaction(['playerSearches'], 'readwrite')
        transaction.oncomplete = (e) => {
            console.log('All Done!')
        }
        transaction.onerror = (e) => {
            // error handling
        }
        objectStore = transaction.objectStore('playerSearches')
        let addReq = objectStore.add(`${leftFirstName.value} ${leftLastName.value}`)
        addReq.onsuccess = (e) => {
            console.log('added successfully')
        }

        addReq = objectStore.add(`${rightFirstName.value} ${rightLastName.value}`)

    } else {
        // did not find players
        // maybe display some error message
    }
}

const handlePlayerStats = (stats) => {
    console.log(stats)
}

handleClickButton()