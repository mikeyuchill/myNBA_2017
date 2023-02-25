const express = require('express');
const fetch = require('node-fetch');
const NBA = require('nba');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8000;

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

app.use(express.static(path.join(__dirname, './frontend/build/')));

// app.get('/api/players/:playerId/info', async (req, res) => {
//     const playerId = req.params.playerId;
//     console.log(playerId);
//     try {
//         const response = await fetch('data.nba.net/10s/prod/v1/2016/players.json');
//         const json = await response.json();

//         const players = json.league.standard;

//         const player = players.find(p => p.personId === playerId);
//         console.log(player);
//         if (player) {
//             res.send(player);
//         } else {
//             res.status(404).send('Player not found');
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server Error');
//     }
// });

app.get('/api/players/:playerId/info', (req, res) => {
    const playerId = req.params.playerId;
    console.log(playerId);
    const data = JSON.parse(fs.readFileSync('./playerInfo2016-2017.json'));
    // find the player with the given playerId
    const player = data.league.standard.find(p => p.personId === playerId);

    if (player) {
        res.send(player);
    } else {
        res.status(404).send('Player not found');
    }
});

app.get('/api/players/:playerId/stats', (req, res) => {
    console.log("inside stats");
    const data = JSON.parse(fs.readFileSync('./PlayerData2016-2017.json'));
    const result = data.resultSet.rowSet.find(row => row[0] === parseInt(req.params.playerId));
    res.json(result);
});


app.get('/api/players/:playerId/shots', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./16-17season.json'));
    const result = data.resultSets[0].rowSet.filter(row => row[3] === parseInt(req.params.playerId));
    // res.json(result);
    res.send(JSON.stringify(result));
});

app.get('/api/players/:playerId/git/shots', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./16-17season.json'));
    const result = data.resultSets[0].rowSet.filter(row => row[3] === parseInt(req.params.playerId));
    // res.json(result);
    res.send(JSON.stringify(result));
});

app.get('/players/:playerId/shots', cors(), async (req, res, next) => {
    console.log("inside player shots");
    NBA.stats
        .shots({ PlayerID: req.params.playerId, Season: '2021-22' })
        .then((shots) => {
            res.send(JSON.stringify(shots));
        })
        .catch((e) => {
            next(e);
        });
});

app.get('/teams/:TeamID/teamInfoCommon', cors(), async (req, res, next) => {
    NBA.stats
        .teamInfoCommon({ TeamID: req.params.TeamID })
        .then((teamInfoCommon) => {
            console.log(teamInfoCommon);
            res.send(JSON.stringify(teamInfoCommon));
        })
        .catch((e) => {
            next(e);
        });
});

app.get('/players/:playerId', (req, res, next) => {
    NBA.stats
        .playerInfo({ PlayerID: req.params.playerId })
        .then((playerInfo) => {
            console.log(playerInfo);
            res.send(JSON.stringify(playerInfo));
        })
        .catch((e) => {
            next(e);
        });
});

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash('/') in the string is important!)
app.get('*', (req, res) => {
    console.log("inside *");
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
