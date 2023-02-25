import React from 'react';
// import { DataViewContainer } from './DataViewContainer';
import nba from '../nba-client';
// import { Profile } from './Profile';
import { SearchBar } from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants';

// const nba = require("nba");

export class Main extends React.Component {

    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }

    loadPlayerInfo = (playerName) => {

        
        const curry = nba.findPlayer('Stephen Curry');
        console.log(curry);
        nba.stats.teamInfoCommon({ TeamID: 1610612747 }).then(data => {console.log(data)});
        nba.stats.playerInfo({ PlayerID: curry.playerId }).then(data => {console.log(data)});
        
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
            console.log(info);
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            this.setState({ playerInfo });
        });
    }

    render() {
        return (
            <div className = "main">
                <SearchBar loadPlayerInfo={this.loadPlayerInfo}/>
                {/* <div className = "player">
                    <Profile playerInfo = {this.state.playerInfo}/>
                    <DataViewContainer playerId = {this.state.playerInfo.playerId}/>
                </div> */}
            </div>
        );
    }
}
