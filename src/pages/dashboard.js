import React, { useEffect, useState } from "react";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "./../util/router.js";
import _ from 'lodash'
import Webcam from "react-webcam";

import { VictoryChart, VictoryTheme, VictoryArea, VictoryStack } from "victory";
import Graph from "../components/Graph.js";

const CAST_API = process.env.REACT_APP_CAST_API

const videoConstraints = {
    width: 544,
    height: 544,
    facingMode: "user"
};


function DashboardPage(props) {
  const auth = useAuth();
  const router = useRouter();
  const [data, setData] = useState([])
  const [imgData, setImgData] = useState(null)
  const [results, setResults] = useState([])

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
                      if (!res.is_food) {
                          // $('#exampleModalLong').modal('hide')
                          alert("I did not detect any recognizable food in this photo!");
                      } else {
                          console.log('results', res)
                          setResults(res.results)
                      }
                  })
          })


  }

  const hasResults = results && results.length > 0

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

          {hasResults && <div>
            
            </div>}
          
      </div>

  )
}

export default DashboardPage;
