import React from 'react';
import { PROFILE_PIC_URL_PREFIX, NBA_TEAM_MAP } from '../constants';
import { SearchBar } from '../components/SearchBar';
import HeadlineStats from "../components/HeadlineStats";
import SvgFiles from './SvgFiles';

const Profile = ({
  loadPlayerInfo,
  loadPlayerStats,
  playerInfo,
  playerStats
}) => {
  let { TEAM, PLAYER } = playerStats;

  let {
    jersey,
    heightFeet,
    heightInches,
    heightMeters,
    weightKilograms,
    weightPounds,
    personId,
    pos,
    yearsPro } = playerInfo;

  const teamColors = TEAM === ("" || undefined) ? "FA" : TEAM;
  jersey = jersey === "" ? "N/A" : jersey;
  const darkTeams = ["BKN", "BOS", "CHI", "CHA", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "MIA", "MIL", "MIN", "NOP", "PHX", "SAC", "UTA", "WAS"];
  return (
    <>
      <div className={`grid grid-cols-5 md:grid-cols-7 bg-${teamColors}`}>
        <SearchBar loadPlayerInfo={loadPlayerInfo} loadPlayerStats={loadPlayerStats} />
        <h1 className={`col-span-5 md:col-span-7 text-center ${darkTeams.includes(teamColors) ? "text-white" : null} text-3xl font-bold py-4`}>{PLAYER} #{jersey} {TEAM}</h1>
        <div className="col-span-3 md:col-start-2">
          <img className="w-full h-full" src={`${PROFILE_PIC_URL_PREFIX}/${personId}.png`} alt={PLAYER} />
        </div>
        <div className="relative col-span-2 bottom-8 grid place-items-center">
          <img src={SvgFiles[`${teamColors}_logo.svg`].default} alt="" />
        </div>
      </div>
      <div className={`bg-${teamColors}-secondary py-1`}>
        <h2 className="font-bold text-lg text-center text-white">2016-2017 Regular Season</h2>
        <HeadlineStats
          heightFeet={heightFeet}
          heightInches={heightInches}
          heightMeters={heightMeters}
          weightKilograms={weightKilograms}
          weightPounds={weightPounds}
          playerStats={playerStats}
          position={pos}
          seasonExp={yearsPro}
        />
      </div>
    </>
  )
}

export default Profile
