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
// import data from "../../data/blair_grady";

const mockUser = {
  name: "Brandon In",
  age: "25",
  weight: "60",
  diabetesType: "2",
  steroids: ["DEXAMETHASONE", "METHYLPREDNISOLONE"],
}

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const data = [
  [{
      x: new Date(2019, 11, 28, 2),
      y: 110
    },
    {
      x: new Date(2019, 11, 28, 0),
      y: 98
    }, {
      x: new Date(2019, 11, 27, 22),
      y: 104
    }, {
      x: new Date(2019, 11, 27, 20),
      y: 89
    }, {
      x: new Date(2019, 11, 27, 18),
      y: 95
    }, {
      x: new Date(2019, 11, 27, 16),
      y: 103
    }, {
      x: new Date(2019, 11, 27, 14),
      y: 100
    }, {
      x: new Date(2019, 11, 27, 12),
      y: 106
  }, {
    x: new Date(2019, 11, 27, 10),
    y: 90
  }, {
    x: new Date(2019, 11, 27, 8),
    y: 126
  }, {
    x: new Date(2019, 11, 27, 6),
    y: 120
  }, {
    x: new Date(2019, 11, 27, 4),
    y: 170
  }, {
    x: new Date(2019, 11, 27, 2),
    y: 130
  }, {
    x: new Date(2019, 11, 27, 0),
    y: 150
  }, {
    x: new Date(2019, 11, 26, 22),
    y: 70
  }, {
    x: new Date(2019, 11, 26, 20),
    y: 110
  }, {
    x: new Date(2019, 11, 26, 18),
    y: 100
  }, {
    x: new Date(2019, 11, 26, 16),
    y: 120
  }, {
    x: new Date(2019, 11, 26, 14),
    y: 160
  }, {
    x: new Date(2019, 11, 26, 12),
    y: 180
  }, {
    x: new Date(2019, 11, 26, 10),
    y: 220
  }, {
    x: new Date(2019, 11, 26, 8),
    y: 250
  }, {
    x: new Date(2019, 11, 26, 6),
    y: 180
  }, {
    x: new Date(2019, 11, 26, 4),
    y: 160
  }, {
    x: new Date(2019, 11, 26, 2),
    y: 90
  }, {
    x: new Date(2019, 11, 25, 0),
    y: 150
  }, {
    x: new Date(2019, 11, 25, 22),
    y: 70
  }, {
    x: new Date(2019, 11, 25, 20),
    y: 110
  }, {
    x: new Date(2019, 11, 25, 18),
    y: 100
  }, {
    x: new Date(2019, 11, 25, 16),
    y: 120
  }, {
    x: new Date(2019, 11, 25, 14),
    y: 118
  }, {
    x: new Date(2019, 11, 25, 12),
    y: 120
  }, {
    x: new Date(2019, 11, 25, 10),
    y: 110
  }, {
    x: new Date(2019, 11, 25, 8),
    y: 130
  }, {
    x: new Date(2019, 11, 25, 6),
    y: 110
  }, {
    x: new Date(2019, 11, 25, 4),
    y: 112
  }, {
    x: new Date(2019, 11, 25, 2),
    y: 98
  }]
];

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
