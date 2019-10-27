import React, { Component, useCallback, useEffect, useState } from 'react'
import InsulinCalculator from "../util/insulinCalculator";
import ReactSlider from 'react-slider'
import Slider from 'react-input-slider'
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

        return (<div class='centered insulin-result confirm-modal'>
            <h3 className='heading'>Does this look right?</h3>

            <p>Food: {food.name}, ~{calories / 10} Calories</p>
            <br />
            
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label white">Carbs</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input class="input" type="number" value={carbGrams} onChange={(e) => setCarbGrams(e.target.value)} placeholder="Carbs" />
                        </p>
                    </div>
                </div>
            </div>

            <br />

            <p>How much of this meal did or will you eat?</p>

            <br />

            <div>{percentage + '%'}</div>
            <Slider
                axis="x"
                xstep={5}
                xmin={0}
                xmax={100}
                x={percentage}
                onChange={({ x }) => setPercentage(x)}
            />
            <br />
            <hr />

            <button class="button is-success" onClick={() => setConfirmed(true)}>Continue</button>

        </div>)
    }

    useEffect(() => {
        console.log('dat', InsulinCalculator(carbGrams, insulinToCarb, insulinSensitivity, premealBloodSugar, actualBloodSugar, [], "white"))
    }, [carbGrams, insulinToCarb, insulinSensitivity, premealBloodSugar, actualBloodSugar]);

    const handleChange = useCallback(event => {
        const { carbGrams, insulinToCarb, insulinSensitivity, premealBloodSugar, actualBloodSugar } = lookUpTable;
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

    const createInput = (label, id, v, handler) => (
        <div class="field is-horizontal insulin-result-input">
        <div class="field-label is-normal">
            <label class="label white">{label}</label>
        </div>
        <div class="field-body">
            <div class="field">
                <p class="control">
                    <input class="input" type="number" value={v} id={id} onChange={handler} />
                </p>
            </div>
        </div>
    </div>
    )

    return (
        <div className='insulin-result'>
            {/* <p>{JSON.stringify(food)}</p> */}
            {/* <br/> */}
            <div className='input-result-section'>
                {createInput('Carbs', lookUpTable.carbGrams, carbGrams, handleChange)}
                {createInput('Insulin to Carb', lookUpTable.insulinToCarb, insulinToCarb, handleChange)}
                {createInput('Insulin Sensitivity', lookUpTable.insulinSensitivity, insulinSensitivity, handleChange)}
                {createInput('Premeal Blood Sugar', lookUpTable.premealBloodSugar, premealBloodSugar, handleChange)}
                {createInput('Actual Blood Sugar', lookUpTable.actualBloodSugar, actualBloodSugar, handleChange)}
            </div>
            {/* <p>Carbs: <input id={lookUpTable.carbGrams} value={carbGrams} onChange={handleChange} /></p>
            <h2>Insulin to Carb: <input id={lookUpTable.insulinToCarb} value={insulinToCarb} onChange={handleChange} /></h2>
            <h2>Insulin Sensitivity: <input id={lookUpTable.insulinSensitivity} value={insulinSensitivity} onChange={handleChange} /></h2>
            <h2>premeal Blood Sugar: <input id={lookUpTable.premealBloodSugar} value={premealBloodSugar} onChange={handleChange} /></h2>
            <h2>actual Blood Sugar: <input id={lookUpTable.actualBloodSugar} value={actualBloodSugar} onChange={handleChange} /></h2> */}
        </div>
    )
}


export default InsulinResult;
