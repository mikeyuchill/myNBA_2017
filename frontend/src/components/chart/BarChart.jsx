import React, { useState, useRef, useEffect } from 'react';
import { CHART_ITEMS, TEAM_LIST } from '../../constants';
import { select } from 'd3-selection';
import { csv, scaleLinear, extent, easeLinear } from "d3"
import * as d3 from 'd3';

function BarChart({ team, season }) {

    const divRef = useRef(null);
    const [sawStats, setSawStats] = useState(false);

    const padding = {
        top: 25,
        left: 10,
        right: 20,
        bottom: 5,
    };

    let width = 850;
    let height = 450;

    let rectwidth = width / 8;
    let rectheight = height / 4;

    let g_allRect;
    let scale_rect;

    function DrawBar(team, season, div_barChart, svg_barChart) {
        select('.svg_barChart').selectAll('g').remove();
        div_barChart.selectAll('image').remove();

        g_allRect = svg_barChart.append("g")
            .attr("class", "allTeam");

        // thisteam = team;
        // thisseason = season;

        csv("https://gist.githubusercontent.com/mikeyuchill/22d09771ebaee6743e974edd25bc143f/raw/f8bbd6347f1e65255c6fc9d3ff84dfb2b1d9233e/NBA_16-17_Season.csv", function (data) {
            let teamData = [], // The selected team's games of the entire season
                pos = 0,
                score = 0;
            for (let i = 0; i < data.length; ++i) {
                if (data[i].Team == team) {
                    teamData[pos++] = data[i];
                    let s = Math.abs(data[i].Score - data[i].OpponentScore);
                    if (s > score) {
                        score = s;
                    }
                }
            }

            // Calculate the width and height of each small rectangle
            scale_rect = scaleLinear()
                .domain([1, score])
                .range([1, rectheight / 3 * 2]);

            let Team_bar = [] // Get all oppenent teams
            pos = 0;
            for (let i = 0; i < TEAM_LIST.length; ++i) {
                if (team != TEAM_LIST[i].Team) {
                    Team_bar[pos++] = TEAM_LIST[i];
                }
            }
            // The results of the selected team's matches with other teams, divided by team
            let Team_Results = [],
                index = 0;
            for (let i = 0; i < Team_bar.length; ++i) {
                let d = [],
                    pos = 0;
                for (let j = 0; j < teamData.length; ++j) {
                    if (Team_bar[i].Team == teamData[j].Opponent) {
                        d[pos++] = teamData[j];
                    }
                }
                Team_Results[index++] = d;
            }
            // Delete the ones that does not have a match
            let results = [];
            index = 0;
            for (let i = 0; i < Team_Results.length; ++i) {
                if (Team_Results[i].length != 0) {
                    results[index++] = Team_Results[i];
                }
            }
            Team_Results = results;

            let g_Team = g_allRect.selectAll("g")
                .data(Team_Results)
                .enter()
                .append("g")
                .attr("class", function (d) {
                    return d[0].Opponent + "_g";
                });

            DrawTeamRect(DrawGameRect, g_Team, div_barChart);
            DrawGameRect(g_Team, data, div_barChart, svg_barChart);
            SetSign(team, season, svg_barChart);
        });
    }

    function DrawTeamRect(callback, g, teamRectGroup, div_barChart) {
        let rectAll = g.append("rect")
            .attr("class", function (d) {
                return d[0].Opponent + "_rect";
            })
            .attr("x", function (d, i) {
                let col = i % 8;
                return padding.left + col * rectwidth;
            })
            .attr("y", function (d, i) {
                let row = parseInt(i / 8);
                return padding.left + row * rectheight;
            })
            .attr("width", rectwidth - 5)
            .attr("height", rectheight - 5)
            .style("fill", getColor)
            .attr("opacity", 0.3)
            .attr("stroke", 'black')
            .attr("stroke-width", 2)
            .attr('stroke-opacity', 1);

        let TeamName = g.append("text")
            .transition()
            .duration(function (d, i) {
                let duration = 1000 * (1 / 30); // Animation duration: 1 sec, calculate the animation time for each rectangle
                return duration;
            })
            .ease(easeLinear)
            .delay(function (d, i) {
                return i * 1000 * (1 / 30);
            })
            .attr("x", function (d, i) {
                let col = i % 8;
                return padding.left + col * rectwidth + rectwidth / 3;
            })
            .attr("y", function (d, i) {
                let row = parseInt(i / 8);
                return padding.left + row * rectheight + 15;
            })
            .text(function (d) {
                for (let i = 0; i < TEAM_LIST.length; ++i) {
                    if (d[0].Opponent == TEAM_LIST[i].Team) {
                        return TEAM_LIST[i].abb;
                    }
                }
            })
            .attr("font-size", "12px");
    }

    function DrawGameRect(g, data, div_barChart, svg_barChart) {
        g.each(function (d) {
            // Get the position and size of each team rectangle
            let rect = select(this)._groups[0][0].firstChild;

            let rectx = parseInt(rect.attributes.x.value);
            let recty = parseInt(rect.attributes.y.value);

            let rectWidth = (rectwidth - 5) / 4;
            let rectHeight = rectheight - 5;

            let GameRect = select(this).selectAll(".rect")
                .data(d)
                .enter()
                .append("rect")
                .attr("x", function (p, i) {
                    return rectx + i * rectWidth;
                })
                .attr("y", function (p, i) {
                    let s = Math.abs(p.Score - p.OpponentScore);
                    return recty + rectheight - scale_rect(s) - 6;
                })
                .attr("width", rectWidth - 5)
                .attr("height", function (d) {
                    let s = Math.abs(d.Score - d.OpponentScore);
                    return scale_rect(s);
                })
                .style("fill", function (p, i) {
                    if (p.Result == 'Lose') {
                        return 'red';
                    } else return 'green';
                })
                .attr("opacity", .8)
                .attr("stroke", "black")
                .attr("stroke-width", .5)
                .on('click', function (d) {
                    DrawTeamToTeam(d, data, div_barChart, svg_barChart);
                })
                .on("mouseover", function (p) {
                    select(this).append("svg:title")
                        .text(function (d) {
                            let s = Math.abs(d.Score - d.OpponentScore);
                            return "Diff: " + s;
                        });
                }); //mouseover
        }); //each 	
    }

    function getColor(d) {
        let Win = 0;
        for (let i = 0; i < d.length; ++i) {
            if (d[i].Result == 'Win') {
                Win += 1;
            }
        }
        if (Win < (d.length / 2)) {
            return "red";
        } else if (Win == (d.length / 2)) {
            return 'white';
        } else return "green";
    }
    function SetSign(team, season, svg_barChart) {
        let sign = ['red', 'green'];
        let pos = 0;
        for (let i = 0; i < TEAM_LIST.length; ++i) {
            if (TEAM_LIST[i].Team == team) {
                pos = i;
                break;
            }
        }
        // Get signs (Figure legend)
        let signs = svg_barChart.selectAll('.sign')
            .data(sign)
            .enter()
            .append('rect')
            .attr('x', width - 170)
            .attr('y', function (d, i) {
                return height - 50 + 15 * i;
            })
            .attr('height', 10)
            .attr('width', 20)
            .style('fill', function (d) {
                return d;
            });
        svg_barChart.selectAll('.sign')
            .data(sign)
            .enter()
            .append('g')
            .append('text')
            .attr('x', width - 140)
            .attr('y', function (d, i) {
                return height - 42 + 15 * i;
            })
            .text(function (d) {
                if (d == 'red') {
                    return 'Lose';
                } else return 'Win';
            })
            .attr('font-size', 12);
    }

    function DrawTeamToTeam(d, data, div_barChart, svg_barChart) {
        let Opponent = d.Opponent;
        let time = d.Time;
        let OpponentData;
        let TeamData = d;
        for (let i = 0; i < data.length; ++i) {
            if (data[i].Time == time && data[i].Team == Opponent) {
                OpponentData = data[i];
            }
        }
        // Delete the previous figure
        div_barChart.selectAll('g').remove();
        div_barChart.selectAll('rect').remove();
        div_barChart.selectAll('image').remove();


        let Teams = [];
        Teams[0] = TeamData.Team;
        Teams[1] = OpponentData.Team;

        // Radar chart - Not functioning now
        // Stats that we interested in
        // let item = ['Assists', 'Block', 'Backboard', 'Foul', 'Score', 'Turnover'];
        // let myextents = {};
        // // Get the maximum and minimum value of each attribute for that season
        // for (let i = 0; i < item.length; ++i) {
        //     myextents[item[i]] = extent(data, function (d) {
        //         return +d[item[i]].split("%")[0];
        //     });
        // }

        // let radar = [];
        // radar[0] = TeamData;
        // radar[1] = OpponentData;

        // let Teams_Radar = [];
        // let index_radar = 0;
        // for (let i = 0; i < TEAM_LIST.length; ++i) {
        //     if (TEAM_LIST[i].Team == TeamData.Team) {
        //         Teams_Radar[index_radar++] = TEAM_LIST[i];
        //     }
        // }
        // for (let i = 0; i < TEAM_LIST.length; ++i) {
        //     if (TEAM_LIST[i].Team == OpponentData.Team) {
        //         Teams_Radar[index_radar++] = TEAM_LIST[i];
        //     }
        // }
        // let radarDatas = [];

        // for (let i = 0; i < radar.length; ++i) {
        //     let radardata = [];
        //     for (let j = 0; j < item.length; ++j) {
        //         radardata[j] = radar[i][item[j]];
        //     }
        //     radarDatas[i] = radardata;
        // }

        // DrawRadar(radarDatas, myextents, Teams_Radar);

        // Pie chart
        let pieTeam = [];
        let pieOpponent = [];
        pieTeam[0] = parseInt(TeamData.T_Hit) * 3;
        pieOpponent[0] = parseInt(OpponentData.T_Hit) * 3;
        pieTeam[1] = parseInt(TeamData.P_Hit) * 1;
        pieOpponent[1] = parseInt(OpponentData.P_Hit) * 1;
        pieTeam[2] = parseInt(TeamData.Score) - pieTeam[0] - pieTeam[1];
        pieOpponent[2] = parseInt(OpponentData.Score) - pieOpponent[0] - pieOpponent[1];
        drawPie(pieTeam, pieOpponent, svg_barChart);
        let g_image = svg_barChart.append('g')
            .attr('class', 'g_image');
        // Home and Away team logo
        g_image.selectAll('image')
            .data(Teams)
            .enter()
            .append('image')
            .attr("xlink:href", function (d) {
                for (let i = 0; i < TEAM_LIST.length; ++i) {
                    if (d == TEAM_LIST[i].Team) {
                        return "../../images/logo/" + TEAM_LIST[i].abb + "_logo.svg";
                    }
                }
            })
            .attr("width", 80 + "px")
            .attr("height", 80 + "px")
            .attr('x', function (d, i) {
                return padding.left + 50 + i * 300;
            })
            .attr('y', padding.top - 25);
        //Home and Away
        let Homes = [];
        Homes[0] = TeamData.Home;
        Homes[1] = OpponentData.Home;
        g_image.selectAll('text')
            .data(Homes)
            .enter()
            .append('text')
            .attr('x', function (d, i) {
                if (i == 0) {
                    return padding.left + 140;
                } else {
                    return padding.left + 180 + i * 150;
                }
            })
            .attr('y', padding.top + 25)
            .text(function (d) {
                return d;
            });
        // Match time
        g_image.append('text')
            .attr('x', padding.left + 200)
            .attr('y', padding.top + 25)
            .text(function () {
                return OpponentData.Time;
            });
        //Assists,Block,Backboard,Foul,Home,Score,Turnover,Steals,P_Shot/P_Hit,S_Shot/S_Hit,T_Shot/T_Hit
        // head to head
        let Items = ['Score', 'Assists', 'Block', 'Forecourt', 'Backcourt', 'Foul', 'Turnover', 'Steals',
            'Penalty', 'Shoot', 'Threes'
        ];
        let ItemsData = [];
        for (let i = 0; i < Items.length; ++i) {
            let d = {};
            d.ItemName = Items[i];
            d.Data = [];
            d.Data[0] = TeamData[Items[i]];
            d.Data[1] = OpponentData[Items[i]];
            ItemsData[i] = d;
        }
        let g_text = svg_barChart.append('g')
            .attr('class', 'g_text');
        let g_rect = svg_barChart.append('g')
            .attr('class', 'g_rect');
        for (let j = 0; j < ItemsData.length; ++j) {
            let ItemData = ItemsData[j];
            // Item name
            g_text.append('text')
                .attr('x', function (d) {
                    return padding.left + 210;
                })
                .attr('y', function (d) {
                    return padding.top + 60 + j * 20;
                })
                .text(function () {
                    for (let i = 0; i < CHART_ITEMS.length; ++i) {
                        if (ItemData.ItemName == CHART_ITEMS[i]) {
                            return CHART_ITEMS[i];
                        }
                    }
                })
                .attr('font-size', 12);
            // Team Rectangle block
            g_rect.selectAll('.rect')
                .data(ItemData.Data)
                .enter()
                .append('rect')
                .attr('x', function (d, i) {
                    if (i == 0) {
                        if (Items[j] == 'Penalty' || Items[j] == 'Shoot' || Items[j] == 'Threes') {
                            return padding.left + 180 - d * 100;
                        } else {
                            return padding.left + 180 - d;
                        }
                    } else {
                        if (Items[j] == 'Penalty' || Items[j] == 'Shoot' || Items[j] == 'Threes') {
                            return padding.left + 120 + i * 150;
                        } else {
                            return padding.left + 120 + i * 150;
                        }
                    }
                })
                .attr('y', function (d) {
                    return padding.top + 50 + j * 20;
                })
                .attr('height', 15)
                .attr('width', function (d) {
                    if (Items[j] == 'Penalty' || Items[j] == 'Shoot' || Items[j] == 'Threes') {
                        return d * 100;
                    } else return d;
                })
                .attr('stroke', 'black')
                .style('fill', 'red')
                .attr('stroke-width', 2)
                .attr('opacity', function (d, i) {
                    if (i == 0) {
                        if (parseFloat(d) > parseFloat(ItemData.Data[1])) {
                            return 1;
                        } else {
                            return 0.5;
                        }

                    } else {
                        if (parseFloat(d) > parseFloat(ItemData.Data[0])) {
                            return 1;
                        } else {
                            return 0.5;
                        }
                    }
                });
            // Item specific values
            g_rect.selectAll('.text')
                .data(ItemData.Data)
                .enter()
                .append('text')
                .attr('x', function (d, i) {
                    if (i == 0) {
                        if (Items[j] == 'Penalty' || Items[j] == 'Shoot' || Items[j] == 'Threes') {
                            return padding.left + 155 - d * 100;
                        } else {
                            return padding.left + 155 - d;
                        }
                    } else {
                        if (Items[j] == 'Penalty' || Items[j] == 'Shoot' || Items[j] == 'Threes') {
                            return padding.left + 130 + i * 150 + parseFloat(d) * 100;
                        } else {
                            return padding.left + 130 + i * 150 + parseInt(d);
                        }
                    }
                })
                .attr('y', function (d, i) {
                    return padding.top + 60 + j * 20;
                })
                .text(function (d, i) {
                    if (Items[j] == 'Penalty' || Items[j] == 'Shoot' || Items[j] == 'Threes') {
                        return parseFloat(d).toFixed(1) * 100 + '%';
                    } else {
                        return d;
                    }
                })
                .attr('font-size', 12);
        }
    }
    function drawPie(team, opponent, svg_barChart) {
        let items = ['3 ptr', 'FT', '2 ptr'];
        let pie = d3.pie();
        let pieData = [];
        pieData[0] = team;
        pieData[1] = opponent;
        let outerRadius = 50;
        let innerRadius = 0; // 0 means no space in between
        let arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        let colors = ['#1f77b4', '#ff7f0e', '#2ca02c'];
        for (let i = 0; i < pieData.length; ++i) {
            let sum = parseInt(pieData[i][0] + pieData[i][1] + pieData[i][2]);
            let arcs = svg_barChart.selectAll(".g_BarChart_Rose")
                .data(pie(pieData[i]))
                .enter()
                .append("g")
                .attr("transform", "translate(" + (width / 17 * (11 + i * 4)) + "," + (height / 9 * 7) + ")");
            arcs.append("path")
                .style("fill", function (d, j) {
                    return colors[j];
                })
                .attr("d", function (d) {
                    return arc(d);
                })
                .on('mouseover', function (d) {
                    let per = parseFloat(parseInt(d.data) / sum) * 100;
                    select(this).append("svg:title")
                        .text((per.toFixed(1)) + '%');
                });
            arcs.append("line")
                .attr("stroke", "black")
                .attr("x1", function (d) {
                    return arc.centroid(d)[0] * 2;
                })
                .attr("y1", function (d) {
                    return arc.centroid(d)[1] * 2;
                })
                .attr("x2", function (d) {
                    return arc.centroid(d)[0] * 2.5;
                })
                .attr("y2", function (d) {
                    return arc.centroid(d)[1] * 2.5;
                });
            arcs.append("text")
                .attr("transform", function (d) {
                    let x = arc.centroid(d)[0] * 2.8;
                    let y = arc.centroid(d)[1] * 2.8;
                    return "translate(" + x + ',' + y + ")";
                })
                .style("fill", "black")
                .attr("text-anchor", "middle")
                .attr('font-size', 10)
                .text(function (d, i) {
                    return items[i];
                });
        }

    }

    useEffect(() => {
        let div_barChart = select(".second");
        const div2 = document.getElementsByClassName('second')[0];

        // Remove old children before rendering the new chart
        if (divRef.current) {
            divRef.current.innerHTML = "";
        }

        let svg_barChart = div_barChart.append("svg")
            .attr("class", "svg_barChart")
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr('viewBox', `0 0 880 500`);

        DrawBar(team, season, div_barChart, svg_barChart);

        // Set the ref to the new div
        divRef.current = div_barChart.node();
    }, [team, sawStats]);

    const handleClick = () => {
        setSawStats(!sawStats);
    };

    return (
        <div className="second" ref={divRef} onClick={handleClick} />
    );
}

export default BarChart;