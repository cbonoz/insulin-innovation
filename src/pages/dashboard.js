import React, { useEffect, useState } from "react";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "./../util/router.js";
import _ from 'lodash'
import Webcam from "react-webcam";

import { VictoryChart, VictoryTheme, VictoryArea, VictoryStack } from "victory";
import InsulinResult from "../components/InsulinResult.js";
import FoodAccordion from "../components/FoodAccordion.js";

const CAST_API = process.env.REACT_APP_CAST_API
const SERVER_URL = process.env.REACT_APP_INSULIN_URL || `localhost`

const TESTING = false

const pastry = {"servingSizes":[{"unit":"1 danish","servingWeight":0.071},{"unit":"100 g","servingWeight":0.1},{"unit":"1 g","servingWeight":0.001},{"unit":"1 oz","servingWeight":0.0283495}],"score":84,"nutrition":{"totalCarbs":0.48,"totalFat":0.18,"protein":0.05,"calories":3710},"name":"Fruit Danish","food_id":"fe71adedcb2f4657","group":"Pastry"}

// let facingMode
// if (typeof window.orientation !== 'undefined') { 
//   facingMode: { exact: "environment" }
// } else {
//   facingMode: "user"
// }

const videoConstraints = {
    width: 544,
    height: 544,
    facingMode: "environment"
}

function DashboardPage(props) {
  const auth = useAuth();
  const router = useRouter();
  const [imgData, setImgData] = useState(null)
  const [results, setResults] = useState([])
  const [food, setFood] = useState(TESTING ? pastry : null)

  // Redirect to /signin if not signed in.
  useEffect(() => {
    // if (auth.user === false) {
    //   router.push("/signin");
    // }
    // window.setInterval(() => {
    //   setData(getData())
    // }, 4000);
  }, [auth, router]);

  let webcamRef = React.createRef();

  const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgData(imageSrc)
      fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
              const formData = new FormData();
              formData.append("image", blob);
              console.log('blob', blob)
              fetch(`https://api-2445582032290.production.gw.apicast.io/v1/foodrecognition?user_key=${CAST_API}`, {
                  method: "POST",
                  body: formData
              })
                  .then(res => res.json())
                  .then(res => {
                      console.log('res', res)
                      if (!res.is_food) {
                          // $('#exampleModalLong').modal('hide')
                          alert("I did not detect any recognizable food in this photo!");
                      } else {
                          setResults(res.results)
                          console.log('results', res.results)
                      }
                  })
          })
  }

  const hasResults = results && results.length > 0
  const hasFood = food && Object.keys(food).length > 0

  const accordion = () => {
    const body = {} // TODO: replace

    fetch(`${SERVER_URL}/food`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
    .then(result => result.json())
    .then(result => {

    })
  }

  function clearResults()  {
    setFood(null)
    setResults([])
  }

  return (
      <div className='centered'>
            {/* <div class="card-content"></div> */}
          {/* <h3>Take a photo</h3> */}
          <br/>
          <Webcam
              audio={false}
              height={544}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={544}
              videoConstraints={videoConstraints}
          />
          <br/>
          <button className="button is-info info-button" onClick={capture}>TAKE PHOTO</button>
          <br/>
          {imgData && <img className='image-result' src={imgData}/>}
          <button class="modal-close is-large" aria-label="close"></button>

          <div className={hasFood ? "modal is-active" : "modal"}>
            <div class="modal-background"></div>
            <div class="modal-content">
                  {/* Show either the food accordion or the recommended insulin result */}
                 {!hasFood && <FoodAccordion results={results} setFood={(food) => setFood(food)}/>}
                 {hasFood && <InsulinResult food={food}/>}
            </div>
            <button class="modal-close is-large" onClick={() => clearResults()} aria-label="close"></button>
          </div>
          
      </div>

  )
}

export default DashboardPage;
