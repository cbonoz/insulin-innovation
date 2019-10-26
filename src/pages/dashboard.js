import React, { useEffect, useState } from "react";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "./../util/router.js";
import _ from 'lodash'

import { VictoryChart, VictoryTheme, VictoryArea, VictoryStack } from "victory";
import Graph from "../components/Graph.js";


function DashboardPage(props) {
  const auth = useAuth();
  const router = useRouter();
  const [data, setData] = useState([])

  // TODO: generate real predictions based on slider settings.
  function getData() {
    return _.range(7).map(() => {
      return [
        { x: 1, y: _.random(1, 5) },
        { x: 2, y: _.random(1, 10) },
        { x: 3, y: _.random(2, 10) },
        { x: 4, y: _.random(2, 10) },
        { x: 5, y: _.random(2, 15) }
      ];
    });
  }

  // Redirect to /signin
  // if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      router.push("/signin");
    }

    window.setInterval(() => {
      setData(getData())
    }, 4000);
  }, [auth, router]);

  return (
    <div>
         <VictoryChart
        theme={VictoryTheme.material}
        animate={{ duration: 1000 }}
      >
        <VictoryStack
          colorScale={"blue"}
        >
          {data.map((data, i) => {
            return (
              <VictoryArea
                key={i}
                data={data}
                interpolation={"basis"}
              />
            );
          })}
        </VictoryStack>
      </VictoryChart>
    </div>
  );
}

export default DashboardPage;
