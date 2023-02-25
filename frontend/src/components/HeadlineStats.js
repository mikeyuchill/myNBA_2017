import React from 'react'

const HeadlineStats = ({
  heightFeet,
  heightInches,
  heightMeters,
  weightKilograms,
  weightPounds,
  playerStats,
  position,
  seasonExp }) => {
  let {
    PLAYER_ID,
    RANK,
    PLAYER,
    TEAM,
    GP,
    MIN,
    FGM,
    FGA,
    FG_PCT,
    FG3M,
    FG3A,
    FG3_PCT,
    FTM,
    FTA,
    FT_PCT,
    OREB,
    DREB,
    REB,
    AST,
    STL,
    BLK,
    TOV,
    PTS,
    EFF } = playerStats;
  const textColor = TEAM === "BKN" ? "text-black" : "text-white";
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>Position</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{position}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>Season Exp</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{seasonExp}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>Height</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{heightFeet}-{heightInches}({heightMeters}m)</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>Weight</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{weightPounds}lb({weightKilograms}kg)</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>GP</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{GP}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>MIN</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{MIN}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>PTS</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{PTS}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>AST</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{AST}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>REB</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{REB}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>OREB</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{OREB}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>DREB</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{DREB}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>STL</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{STL}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>BLK</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{BLK}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>FG3_PCT</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{FG3_PCT}</div>
      </div>
      <div>
        <div className="border-2 border-gray-400"><h3 className={`font-bold ${textColor}`}>EFF</h3></div>
        <div className={`border-2 border-gray-400 ${textColor}`}>{EFF}</div>
      </div>

    </div>
  )
}

export default HeadlineStats
