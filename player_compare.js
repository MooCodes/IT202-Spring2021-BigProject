// all of the code related to making the get requests to the NBA API
// The API Links
// NBA Stats API:   https://www.quora.com/Is-there-an-NBA-API-for-free-that-has-live-stats
//                  http://data.nba.net/10s/prod/v1/2020/players.json (find any player)
//                  https://data.nba.net/data/10s/prod/v1/2020/players/1628960_profile.json (gets Grayson Allen stats)
// NBA Image API:   https://nba-players.herokuapp.com/

// What happens when we click the compare button
const compareButton = document.querySelector('#compare-button')
compareButton.addEventListener("click", () => {
    fetch('http://data.nba.net/10s/prod/v1/2020/players.json')
        .then(res => res.json())
        .then(data => handlePlayerData(data.league.standard))
})

// function that handles player data once we get it from request
const handlePlayerData = (players) => {
    players.forEach(p => {
        if (p.firstName.toLowerCase() == 'lebron' && p.lastName.toLowerCase() == 'james')
            console.log(p.firstName, p.lastName)
    })
}