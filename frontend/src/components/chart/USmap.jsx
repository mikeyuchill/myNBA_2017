import React, { useEffect, useState } from "react";
import { csv, geoAlbersUsa, geoPath, zoom, json, zoomTransform } from "d3"
import { select, event as currentEvent } from 'd3-selection';
import transition from 'd3-transition';


const paddingMap = {
  top: 20,
  right: 70,
  bottom: 0,
  left: 20,
};

const height = 800;
const width = 700;
const margin = { top: 50, right: 100, bottom: 210, left: 20 };

function Map({ setTeamName }) {
  // const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);

  useEffect(() => {
    const div = select(".map_select");

    const div1 = document.getElementsByClassName("map_select")[0];

    // Get div width and height
    // const width = div1.offsetWidth - paddingMap.left - paddingMap.right;
    // const height = div1.offsetHeight - paddingMap.top - paddingMap.bottom;
    // setWidth(div1.offsetWidth - paddingMap.left - paddingMap.right);
    // setHeight(div1.offsetHeight - paddingMap.top - paddingMap.bottom);

    const other = select(".map_select").append("div").attr("id", "other");

    const svg = div
      .append("svg")
      .attr("class", "map")
      // .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("viewBox", "0 0 " + 850 + " " + 600);

    const projection = geoAlbersUsa().translate([850 / 5 * 2, 600 / 5 * 2]).scale([width * 1.5]);

    const path = geoPath().projection(projection);

    const zoom1 = zoom()
      .scaleExtent([1, 10]) // Set the minimum and maximum scaling
      .on("zoom", zoomed);

    const map_g = svg
      .append("g")
      .attr("class", "map_g")
      .call(zoom1)
      .attr("transform", "translate(" + paddingMap.left + "," + paddingMap.top + ")");

    function zoomed() {
      map_g.attr(
        "transform",
        // "translate(" + currentEvent.translate + ")scale(" + currentEvent.scale + ")"
        zoomTransform(this)
      );
    }

    csv("https://gist.githubusercontent.com/mikeyuchill/22d09771ebaee6743e974edd25bc143f/raw/4aeb6be6aa2fc02427ff46613216417c0a821edc/US-states.csv", function (error, csvData) {
      json("https://gist.githubusercontent.com/mikeyuchill/22d09771ebaee6743e974edd25bc143f/raw/acf1b165482ff1721faaeabd21b2f97b4f929f05/US-geo.json", function (jsonData) {
        // Determine east or west
        for (let i = 0; i < csvData.length; i++) {
          const dataState = csvData[i].state; // Grab state name
          const dataValue = parseFloat(csvData[i].value); // Grab data value, and convert from string to float

          const dataEASTorWEST = csvData[i].EASTorWEST;
          // Find the corresponding state inside the GeoJSON
          for (let j = 0; j < jsonData.features.length; j++) {
            const jsonState = jsonData.features[j].properties.name;
            if (dataState === jsonState) {
              // Copy the data value into the JSON
              jsonData.features[j].properties.EASTorWEST = dataEASTorWEST;
              // Stop looking through the JSON
              break;
            }
          }
        }
        // Draw the map
        map_g
          .selectAll("path")
          .data(jsonData.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("stroke", "white")
          .attr("stroke-width", 2)
          .attr("class", function (d) {
            return d.properties.postal;
          })
          .attr("transform", "translate(" + paddingMap.left + "," + paddingMap.top + ")")
          .style("fill", function (d) {
            const EastorWest = d.properties.EASTorWEST;
            if (EastorWest) {
              if (EastorWest === "East") return "#C6E2FF";
              else return "#F53D5C";
            } else return "#ccc";
          });
        csv("https://gist.githubusercontent.com/mikeyuchill/22d09771ebaee6743e974edd25bc143f/raw/df12d4120370e84739bf51f45185f3b7c5c5b1e4/NBA-teams.csv", function (data) {
          let index_map = 0;
          map_g
            .selectAll("image")
            .data(data)
            .enter()
            .append("image")
            .attr("class", function (d) {
              return d.abb;
            })
            .attr("xlink:href", function (d) {
              return "images/logo/" + d.abb + "_logo.svg";
            })
            .attr("width", 40 + "px")
            .attr("height", 40 + "px")
            .attr("x", function (d) {
              if (d.abb === "PHI") {
                return projection([d.lon, d.lat])[0] + 30;
              } else if (d.abb === "NYK") {
                return projection([d.lon, d.lat])[0] + 20;
              } else return projection([d.lon, d.lat])[0];
            })
            .attr("y", function (d) {
              if (d.abb === "PHI") {
                return projection([d.lon, d.lat])[1] + 20;
              } else if (d.abb === "NYK") {
                return projection([d.lon, d.lat])[1];
              } else return projection([d.lon, d.lat])[1];
            })
            .attr("transform", "translate(" + paddingMap.left + "," + paddingMap.top + ")")
            .on("click", ClickTeam)
            .on("mouseover", MouseOver)
            .on("mouseout", MouseOut);
        });
      });
    });
  }, []);

  function ClickTeam(d) {
    const _TeamName = d.teamname;
    const _TeamAbb = d.abb;
    setTeamName(_TeamName, _TeamAbb);
  }

  function MouseOver(d) {
    if (d.EASTorWEST === "West") {
      select(this)
        .transition()
        .attr("width", 80 + "px")
        .attr("height", 60 + "px")
        .duration(200);
      select(this)
        .append("svg:title")
        .text(function (d) {
          return d.teamname + "(" + d.abb + ")";
        });
    } else {
      select(this)
        .transition()
        .attr("width", 80 + "px")
        .attr("height", 60 + "px")
        .attr(
          "transform",
          "translate(" + (paddingMap.left - 40) + "," + paddingMap.top + ")"
        )
        .duration(200);
      select(this)
        .append("svg:title")
        .text(function (d) {
          return d.teamname + "(" + d.abb + ")";
        });
    }
  }

  function MouseOut(d) {
    if (d.EASTorWEST === "West") {
      select(this)
        .transition()
        .attr("width", 40 + "px")
        .attr("height", 40 + "px")
        .duration(200);
    } else {
      select(this)
        .transition()
        .attr("width", 30 + "px")
        .attr("height", 30 + "px")
        .attr(
          "transform",
          "translate(" + paddingMap.left + "," + paddingMap.top + ")"
        )
        .duration(200);
    }
  }
  return (
    <div className="map_select">
    </div >

  );
}

export default Map;