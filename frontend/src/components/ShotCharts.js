import React, { memo } from 'react'
import ShotLegend from "./ShotLegend"
import ShotChart from "./ShotChart"

const ShotCharts = memo(({ state }) => {
  return (
    <>
      <ShotChart
        playerId={state.playerInfo.personId}
        minCount={state.minCount}
        chartType={state.chartType}
        displayToolTip={state.displayToolTips}
      />
      <svg
        className="col-start-2 col-span-7"
        viewBox={`0 0 500 40`}
      >
        <ShotLegend chartType={state.chartType} />
      </svg>
    </>
  )
})

export default ShotCharts
