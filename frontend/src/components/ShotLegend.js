import React from 'react'

const ShotLegend = ({ chartType }) => {
  return (
    <>
      {chartType === "hexbin" ?
        <text className="lg-text" x={25} y={25} font-size="smaller">Hover/Click to see the details</text>
        :
        <g>
          <text className="lg-text" x={25} y={25} font-size="smaller">Hover/Click to see the shot type</text>
          <circle
            className="mark"
            cx={352}
            cy={20}
            r={10}
          />
          <text className="sl-text" x={370} y={25} >Make</text>
          <circle className="mark miss"
            cx={437}
            cy={20}
            r={10}
          />
          <text className="sl-text" x={455} y={25} >Miss</text>
        </g>
      }
    </>
  )
}

export default ShotLegend
