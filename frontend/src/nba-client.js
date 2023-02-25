// const SERVER_URL = 'https://mynba2023.herokuapp.com';
const SERVER_URL = 'http://localhost:8000';
//web <==> node api server
export default {
    stats: {
        //para: playerID
        //Return :
        playerInfo: function ({ PlayerID }) {
            return fetch(`/api/players/${PlayerID}/info`)
                .then(res => res.json()) //fetch...promission
                // .then(player => {
                //     // Do something with the player data if found
                //     console.log(player);
                // })
                .catch(error => {
                    // Handle the error if the player is not found
                    console.log('Player not found');
                });
        },
        playerStats: function ({ PlayerID }) {
            return fetch(`/api/players/${PlayerID}/stats`).then(res => res.json())
                .catch(error => {
                    // Handle the error if the player is not found
                    console.log('Player stats not found');
                });
        },
        shots: function ({ PlayerID }) {
            return fetch(`/api/players/${PlayerID}/shots`).then(res => res.json())
        },
        teamHistoricalLeaders: function ({ PlayerID }) {
            return fetch(`/players/${PlayerID}/shots`).then(res => res.json())
        },
    },
};

//promise status:
//pending
//resolve
//reject
