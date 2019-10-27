import React, { useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
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
        <VictoryChart width={300} height={300} scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={(domain) => handleZoom(domain)}
            />
          }
        >
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={[
                { a: new Date(1982, 1, 1), b: 125 },
                { a: new Date(1987, 1, 1), b: 257 },
                { a: new Date(1993, 1, 1), b: 345 },
                { a: new Date(1997, 1, 1), b: 515 },
                { a: new Date(2001, 1, 1), b: 132 },
                { a: new Date(2005, 1, 1), b: 305 },
                { a: new Date(2011, 1, 1), b: 270 },
                { a: new Date(2015, 1, 1), b: 470 }
              ]}
              x="a"
              y="b"
            />

          </VictoryChart>
          <VictoryChart
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={300} height={300} scale={{ x: "time" }}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={zoomDomain}
                onBrushDomainChange={(domain) => handleZoom(domain)}
              />
            }
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={[
                { key: new Date(1982, 1, 1), b: 125 },
                { key: new Date(1987, 1, 1), b: 257 },
                { key: new Date(1993, 1, 1), b: 345 },
                { key: new Date(1997, 1, 1), b: 515 },
                { key: new Date(2001, 1, 1), b: 132 },
                { key: new Date(2005, 1, 1), b: 305 },
                { key: new Date(2011, 1, 1), b: 270 },
                { key: new Date(2015, 1, 1), b: 470 }
              ]}
              x="key"
              y="b"
            />
          </VictoryChart>
      </div>
    </div>
  );
}

export default ProfilePage;
