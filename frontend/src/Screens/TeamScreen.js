import React from 'react';
import { TEAM_LIST } from '../constants';
import USMap from "../components/chart/USmap"
import BarChart from '../components/chart/BarChart';
import SvgFiles from '../components/SvgFiles';

export class TeamScreen extends React.Component {

  state = {
    teams: TEAM_LIST,
    team: 'Lakers',
    abbreviation: 'LAL',
    season: '16-17'
  }

  componentDidMount() {
    this.setTeamName(this.state.team, this.state.abbreviation);
  }

  setTeamName = (teamName, teamAbb) => {
    this.setState({ team: teamName, abbreviation: teamAbb });
  }


  render() {
    return (
      <div className="">
        <div className="bg-wood-pattern grid">
          <div className="col-start-1 col-span-1 mt-0 mb-20 lg:mr-26 place-content-center">
            <USMap setTeamName={this.setTeamName} />
            <div className="flex justify-center">
              <text className="text-black lg-text" >Zoom and click on the NBA team to see its stats!</text>
            </div>
            <div className="flex justify-center">
              <img className="w-full max-w-md" src={SvgFiles[`${this.state.abbreviation}_logo.svg`].default} alt="" />
            </div>
            <div className="flex justify-center">
              <text className="text-black lg-text" >Click the bar to see detailed head-to-head stats or click anywhere else to return! Also you could hover onto the bar to see more stats :D</text>
            </div>
            <BarChart team={this.state.team} season={this.state.season} />
          </div>
        </div>
      </div>
    );
  }
}