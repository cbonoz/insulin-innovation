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
import { Link } from "./../util/router.js";

const createBubbleText = (text) => (<div>
    <div style={{ color: "white", backgroundColor: "rgb(73, 167, 199)", padding: "5px 10px", borderRadius: "15px", display: "inline-block", border: "1px solid white" }}>
        {text}
    </div>
</div>
)

const mockUser = {
    name: "Brandon In",
    age: "25",
    weight: "60",
    diabetesType: "2",
    location: "Boston, MA",
    employment: "Restaurant Cashier",
    education: "Bachelors",
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

const ProfilePage = props => {
    const [user, setUser] = useState(mockUser);

    const [zoomDomain, setZoomDomain] = useState({ x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] });

    const handleZoom = (domain) => setZoomDomain(domain);

    return (
        <div className="profile">
            <div>
                <h1 className="profile_font">
                    {user.name}
                </h1>
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="patient" class="profile_image" />
                <div>
                    < button className="calculate_insulin_button" > < Link className="calculate_insulin_button" to="/dashboard"> Calculate Insulin </Link></button>
                </div>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <h1 style={{ display: "inline-block", marginRight: "50px", fontSize: "20px", fontWeight: "bold" }}>
                        Age
              <h2>{user.age}</h2>
                    </h1>
                    <h1 style={{ display: "inline-block", fontSize: "20px", fontWeight: "bold" }}>
                        Weight
              <h2>{user.weight} kg</h2>
                    </h1>
                </div>
                <div className="profile-item">
                    Steroids:
                </div>
                {user.steroids.map(createBubbleText)}
                <div className="profile-item">
                    Location:
                </div>
                {createBubbleText(user.location)}

                <div className="profile-item">
                    Employment:
                </div>
                {createBubbleText(user.employment)}
                <div className="profile-item">
                    Education:
                </div>
                {createBubbleText(user.education)}

            </div>
            <div className="victoryContainer">
                <div className="profile-item">
                    Your glucose history:
                </div>
                <VictoryChart
                    theme={VictoryTheme.material}
                    width={400} height={400}
                    domain={{ y: [0, 300] }}
                    scale={{ x: "time" }}
                >
                    <VictoryLabel text="Glucose" x={200} y={30} textAnchor="middle" />

                    <VictoryLabel text="Hyper" x={90} y={140} textAnchor="middle" />
                    {data.map((d, i) => (
                        <VictoryLine
                            key={i}
                            data={d}
                            style={{ data: { stroke: "red" } }}
                            // normalize data
                            y={(datum) => 200}
                        />
                    ))}

                    <VictoryLabel text="High" x={90} y={195} textAnchor="middle" />
                    {data.map((d, i) => (
                        <VictoryLine
                            key={i}
                            data={d}
                            style={{ data: { stroke: "orange" } }}
                            // normalize data
                            y={(datum) => 145}
                        />
                    ))}

                    <VictoryLabel text="Target" x={90} y={240} textAnchor="middle" />
                    {data.map((d, i) => (
                        <VictoryLine
                            key={i}
                            data={d}
                            style={{ data: { stroke: "green" } }}
                            // normalize data
                            y={(datum) => 100}
                        />
                    ))}

                    <VictoryLabel text="Lo" x={90} y={260} textAnchor="middle" />
                    {data.map((d, i) => (
                        <VictoryLine
                            key={i}
                            data={d}
                            style={{ data: { stroke: "lightblue" } }}
                            // normalize data
                            y={(datum) => 80}
                        />
                    ))}

                    <VictoryLabel text="Hypo" x={90} y={290} textAnchor="middle" />
                    {data.map((d, i) => (
                        <VictoryLine
                            key={i}
                            data={d}
                            style={{ data: { stroke: "red" } }}
                            // normalize data
                            y={(datum) => 50}
                        />
                    ))}

                    < VictoryAxis tickFormat={
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
                            tickFormat={(t) => t}
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
