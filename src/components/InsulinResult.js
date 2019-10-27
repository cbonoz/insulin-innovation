import React, { Component, useCallback, useEffect, useState } from 'react'
import InsulinCalculator from "../util/insulinCalculator";
import ReactSlider from 'react-slider'
import Footer from './Footer';

const lookUpTable = {
    carbGrams: "carbGrams",
    insulinToCarb: "insulinToCarb",
    insulinSensitivity: "insulinSensitivity",
    premealBloodSugar: "premealBloodSugar",
    actualBloodSugar: "actualBloodSugar",
}

const InsulinResult = props => {
 
    const { food } = props
    const { nutrition } = food
    const { totalCarbs, totalFat, protein, calories } = nutrition

    const [carbGrams, setCarbGrams] = useState(totalCarbs * 100 || 50);
    const [insulinToCarb, setInsulinToCarb] = useState(10);
    const [insulinSensitivity, setInsulinSensitivity] = useState(50);
    const [premealBloodSugar, setPremealBloodSugar] = useState(80);
    const [actualBloodSugar, setActualBloodSugar] = useState(140);
    const [percentage, setPercentage] = useState(100)
    const [confirmed, setConfirmed] = useState(false)

    function confirmFood() {
        
        return (<div class='centered insulin-result'>
            <h3>Does this look right?</h3>

            <p>{food.name}</p>

            <div class="control">
                <input class="input" type="number" value={carbGrams} onChange={(e) => setCarbGrams(e.target.value)} placeholder="Carbs"/>
            </div>

            <p>How much of this meal did or will you eat?</p>

            <ReactSlider
                value={percentage}
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                onChange={(v) => setPercentage(v)}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            />

            <button class="button is-success" onClick={() => setConfirmed(true)}>Continue</button>

        </div>)
    }

    useEffect(() => {
        console.log('dat', InsulinCalculator(carbGrams, insulinToCarb, insulinSensitivity, premealBloodSugar, actualBloodSugar, [], "white"))
    }, [carbGrams, insulinToCarb, insulinSensitivity, premealBloodSugar, actualBloodSugar]);

    const handleChange = useCallback(event => {
        const { carbGrams, insulinToCarb, insulinSensitivity, premealBloodSugar, actualBloodSugar} = lookUpTable;
        switch (event.target.id) {
            case carbGrams:
                setCarbGrams(event.target.value);
                break;
            case insulinToCarb:
                setInsulinToCarb(event.target.value);
                break;
            case insulinSensitivity:
                setInsulinSensitivity(event.target.value);
                break;
            case premealBloodSugar:
                setPremealBloodSugar(event.target.value);
                break;
            case actualBloodSugar:
                setActualBloodSugar(event.target.value);
                break;
            default:
        }
    }, [])

    if (!confirmed) {
        return confirmFood()
    }

    return (
        <div className='insulin-result'>
            {/* <p>{JSON.stringify(food)}</p> */}
            {/* <br/> */}
            <p>Carbs: <input id={lookUpTable.carbGrams} value={carbGrams} onChange={handleChange} /></p>
            <h2>Insulin to Carb: <input id={lookUpTable.insulinToCarb} value={insulinToCarb} onChange={handleChange} /></h2>
            <h2>Insulin Sensitivity: <input id={lookUpTable.insulinSensitivity} value={insulinSensitivity} onChange={handleChange} /></h2>
            <h2>premeal Blood Sugar: <input id={lookUpTable.premealBloodSugar} value={premealBloodSugar} onChange={handleChange} /></h2>
            <h2>actual Blood Sugar: <input id={lookUpTable.actualBloodSugar} value={actualBloodSugar} onChange={handleChange} /></h2>
        </div>
    )
}


export default InsulinResult;
