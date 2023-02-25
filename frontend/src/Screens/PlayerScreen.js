import React, { useMemo, useState, Suspense } from 'react';
import _ from 'lodash';
import nba from 'nba';
import nbaAPI from '../nba-client';
import Profile from "../components/Profile"
import { PROFILE_PIC_URL_PREFIX, DEFAULT_PLAYER_INFO, DEFAULT_PLAYER_STATS, STATS_HEADER } from '../constants';
import { CountSlider } from '../components/CountSlider';
import { Switch } from 'antd';

const ShotCharts = React.lazy(() => import('../components/ShotCharts'))

const usableWidth = 500

export class PlayerScreen extends React.Component {

  state = {
    playerInfo: DEFAULT_PLAYER_INFO,
    playerStats: DEFAULT_PLAYER_STATS,
    minCount: 2,
    chartType: 'hexbin',
    displayToolTips: true,
    error: "",
    unavilablePlayer: 1630163,
    showModal: false
  }
  componentDidMount() {
    this.loadPlayerInfo(this.state.playerStats.PLAYER);
    this.loadPlayerStats(this.state.playerStats.PLAYER);
  }

  loadPlayerInfo = (playerName) => {

    nbaAPI.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
      if (info) this.setState({ playerInfo: info });//set states
      else {
        this.setState({
          playerInfo: DEFAULT_PLAYER_INFO,
          error: "Player information is not available yet.",
          showModal: true,
          unavilablePlayer: nba.findPlayer(playerName).playerId
        });
      };
    });
  }

  loadPlayerStats = (playerName) => {
    const pStats = {};
    nbaAPI.stats.playerStats({ PlayerID: nba.findPlayer(playerName).playerId }).then((stats) => {
      if (stats) {
        STATS_HEADER.forEach((header, i) => {
          pStats[header] = stats[i];
        });
        this.setState({ playerStats: pStats });
      }
      else {
        this.setState({ playerStats: DEFAULT_PLAYER_STATS });
      }

    });

  }

  onCountSliderChange = (count) => {
    this.setState({ minCount: Number(count) || 2 });
  }

  onChartTypeChange = (e) => {
    this.setState({ chartType: e.target.value });
  }

  onTooltipChange = (displayToolTip) => {
    this.setState({ displayToolTips: displayToolTip });
  }

  render() {
    return (
      <div className="">

        <Profile
          loadPlayerInfo={this.loadPlayerInfo}
          loadPlayerStats={this.loadPlayerStats}
          playerInfo={this.state.playerInfo}
          playerStats={this.state.playerStats}
        />
        <div className="bg-wood-pattern lg:grid pt-5 lg:pt-0">
          <div className="lg:grid lg:grid-cols-10">
            <div className="col-start-2 col-span-7">
              <div className="text-center space-x-5 bg-gray-800 col-span-10 md:col-start-2 md:col-span-8">
                <button className={`text-white text-xl py-3 ${this.state.chartType === 'hexbin' ? "bg-gray-800" : null}`} onClick={this.onChartTypeChange} value="hexbin">Hexbin</button>
                <button className="text-white text-xl py-3" onClick={this.onChartTypeChange} value="scatter">Scatter</button>
              </div>
              {this.state.chartType === 'hexbin' ?
                <CountSlider
                  minCount={this.state.minCount}
                  onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
                  onTooltipChange={this.onTooltipChange}
                /> :
                <div className="bg-gray-800">
                  <text className="text-white" >Tooltip:</text>
                  <Switch
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    defaultChecked
                    onChange={this.onTooltipChange}
                  />
                </div>
              }
              <Suspense fallback={<div>Loading...</div>}>
                <ShotCharts
                  usableWidth={usableWidth}
                  state={this.state}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {this.state.showModal && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <img className="h-6 w-6 text-red-600 rounded-full" src={`${PROFILE_PIC_URL_PREFIX}/${this.state.unavilablePlayer}.png`} alt={this.state.playerStats.PLAYER} />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Player not found</h3>
                      <div className="mt-2">
                        <p className="text-sm leading-5 text-gray-500">
                          The player information you requested is not available. The application only supports players who have played in the 2016-2017 season.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5" onClick={() => this.setState({ showModal: false })}>
                      OK
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}