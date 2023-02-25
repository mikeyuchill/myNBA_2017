import React from 'react';
import nbaAPI from '../nba-client';
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';
import { court, shots } from 'd3-shotchart';
import PropTypes from 'prop-types';

window.d3_hexbin = { hexbin: hexbin }; // workaround library problem

const ShotChart = ({ playerId, minCount, chartType, displayToolTip }) => {
    nbaAPI.stats.shots({
        PlayerID: playerId
    }).then((response) => {
        // https://github.com/mc-buckets/d3-shotchart
        const final_shots = response.map(shot => ({
            x: (shot[17] + 250) / 10, // .locX
            y: (shot[18] + 50) / 10, // .locY
            action_type: shot[11], // .actionType
            shot_distance: shot[16], // .shotDistance
            shot_made_flag: shot[20], // .shotMadeFlag
        }));

        // get the type of displayTooltip
        const courtSelection = d3.select("#shot-chart");
        courtSelection.html('');
        const chart_court = court().width(500);
        const chart_shots = shots()
            .shotRenderThreshold(minCount)
            .displayToolTips(displayToolTip)
            .displayType(chartType);
        courtSelection.call(chart_court); // Invoke the function exactly once, passing the specified arguments and context.
        // reference: https://bost.ocks.org/mike/selection/#data
        courtSelection.datum(final_shots).call(chart_shots);
    });
    return (
        // <svg width="500"
        // height="470"
        // viewBox={`0 0 ${500} ${470}`}
        // id="shot-chart"/>
        <div className="col-start-2 col-span-4" id="shot-chart"></div>
    )
}

export default ShotChart
