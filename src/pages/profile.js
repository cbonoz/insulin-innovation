import React, { useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";
import chart_data from "../data/chart_data"

const mockUser = {
  name: "Brandon In",
  age: "25",
  weight: "60",
  diabetesType: "2",
  steroids: ["DEXAMETHASONE", "METHYLPREDNISOLONE"],
}
const data = chart_data.CHART_DATA
// find maxima for normalizing data

const maxima = data.map(
  (dataset) => Math.max(...dataset.map((d) => d.y))
);

const xOffsets = [50, 350];
const tickPadding = [0, 0, -15];
const anchors = ["end", "end", "start"];
const colors = ["gray", "red"];

const ProfilePage = props  => {
  const [user, setUser] = useState(mockUser);

  const [zoomDomain, setZoomDomain] = useState({ x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] });

  const handleZoom = (domain) => setZoomDomain(domain);

  return (
    <div className="profile">
      <div>
          <h2>
            Patient: {user.name}
          </h2>
          <h2>
            Age: {user.age}
          </h2>
          <h2>
            {user.weight ? `Weight: ${user.weight} kg` : ''}
          </h2>
          <h2>
            Steroids:
          </h2>
          {user.steroids.map(steroid => (
            <h2>
              {steroid}
            </h2>
          ))
          }
      </div>
      <div className="victoryContainer">
        <VictoryChart
          theme={VictoryTheme.material}
          width={400} height={400}
          domain={{ y: [0, 300] }}
          scale={{ x: "time" }}
        >
          <VictoryLabel text="Glucose" x={200} y={30} textAnchor="middle"/>

          <VictoryLabel text="Hyper" x={90} y={140} textAnchor="middle"/>
          {data.map((d, i) => (
            <VictoryLine
              key={i}
              data={d}
              style={{ data: { stroke: "red" } }}
              // normalize data
              y={(datum) => 200}
            />
          ))}

          <VictoryLabel text="High" x={90} y={195} textAnchor="middle"/>
          {data.map((d, i) => (
            <VictoryLine
              key={i}
              data={d}
              style={{ data: { stroke: "orange" } }}
              // normalize data
              y={(datum) => 145}
            />
          ))}

          <VictoryLabel text="Target" x={90} y={240} textAnchor="middle"/>
          {data.map((d, i) => (
            <VictoryLine
              key={i}
              data={d}
              style={{ data: { stroke: "green" } }}
              // normalize data
              y={(datum) => 100}
            />
          ))}

          <VictoryLabel text="Lo" x={90} y={260} textAnchor="middle"/>
          {data.map((d, i) => (
            <VictoryLine
              key={i}
              data={d}
              style={{ data: { stroke: "lightblue" } }}
              // normalize data
              y={(datum) => 80}
            />
          ))}

          <VictoryLabel text="Hypo" x={90} y={290} textAnchor="middle"/>
          {data.map((d, i) => (
            <VictoryLine
              key={i}
              data={d}
              style={{ data: { stroke: "red" } }}
              // normalize data
              y={(datum) => 50}
            />
          ))}

          < VictoryAxis tickFormat = {
            (x) => new Date(x).getHours() >= 12 ?
              new Date(x).getHours() + "PM" :
              new Date(x).getHours() + "AM"
          }
          />
          {data.map((d, i) => (
            <VictoryAxis dependentAxis
              key={i}
              offsetX={xOffsets[i]}
              style={{
                axis: { stroke: colors[i] },
                ticks: { padding: tickPadding[i] },
                tickLabels: { fill: colors[i], textAnchor: anchors[i] }
              }}
              tickFormat={(t) => t }
            />
          ))}
          {data.map((d, i) => (
            <VictoryLine
              key={i}
              data={d}
              style={{ data: { stroke: colors[i] } }}
              // normalize data
              y={(datum) => datum.y}
            />
          ))}
        </VictoryChart>
      </div>
    </div>
  );
}

export default ProfilePage;
