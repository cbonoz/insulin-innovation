import React, { useCallback, useEffect, useState } from 'react'
import InsulinCalculator from "../util/insulinCalculator"
import ReactSlider from 'react-slider'
import Slider from 'react-input-slider'
import Footer from './Footer'

const lookUpTable = {
    carbGrams: "carbGrams",
    insulinToCarb: "insulinToCarb",
    insulinSensitivity: "insulinSensitivity",
    premealBloodSugar: "premealBloodSugar",
    actualBloodSugar: "actualBloodSugar",
}

const InsulinResult = props => {
    let totalCarbs
    let name = 'pastry'
    let calories
    if (props.food) {
        const { food } = props
        name = food.name
        const { nutrition } = food
        totalCarbs = nutrition.totalCarbs
        calories = nutrition.calories
    }

    const [percentage, setPercentage] = useState(100)
    const [carbGrams, setCarbGrams] = useState((totalCarbs * percentage) || 50)
    const [insulinToCarb, setInsulinToCarb] = useState(10)
    const [insulinSensitivity, setInsulinSensitivity] = useState(50)
    const [premealBloodSugar, setPremealBloodSugar] = useState(80)
    const [actualBloodSugar, setActualBloodSugar] = useState(140)
    const [insulinCalculation, setInsulinCalculation] = useState(InsulinCalculator(carbGrams, insulinToCarb, insulinSensitivity, premealBloodSugar, actualBloodSugar, [], "white"))

    const [confirmed, setConfirmed] = useState(false)

    function confirmFood() {

        return (<div class='centered insulin-result confirm-modal'>
            <h3 className='heading'>Does this look right?</h3>

            <p>Food: {name}, ~{calories / 10} Calories</p>
            <br />

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Carbs</label>
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

            <p>How much of this meal do you think you will you eat?</p>

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

        </div>
        )
    }

    useEffect(() => {
        setInsulinCalculation(InsulinCalculator(carbGrams, insulinToCarb, insulinSensitivity, premealBloodSugar, actualBloodSugar, [], "white"))
    }, [props.food, carbGrams, insulinToCarb, insulinSensitivity, premealBloodSugar, actualBloodSugar])

    const handleChange = useCallback(event => {
        // const { carbGrams, insulinToCarb, insulinSensitivity, premealBloodSugar, actualBloodSugar } = lookUpTable
        switch (event.target.id) {
            case lookUpTable.carbGrams:
                setCarbGrams(event.target.value)
                break
            case lookUpTable.insulinToCarb:
                setInsulinToCarb(event.target.value)
                break
            case lookUpTable.insulinSensitivity:
                setInsulinSensitivity(event.target.value)
                break
            case lookUpTable.premealBloodSugar:
                setPremealBloodSugar(event.target.value)
                break
            case lookUpTable.actualBloodSugar:
                setActualBloodSugar(event.target.value)
                break
            default:
        }

    }, [])

    if (!confirmed) {
        return confirmFood()
    }

    const createInput = (label, id, v, handler) => (
        <div class="field is-horizontal insulin-result-input">
            <div class="field-label is-normal">
                <label class="label">{label}</label>
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
            <div className='insulin-result-section'>
                <h3 className='heading'>Your Result</h3>
                <h2>
                    <span className='insulin-result-units'>{Math.round(insulinCalculation, 2)}</span>
                    <span className='insulin-result-text'>Insulin Units</span>
                </h2>
                <br/>
                <p>Based on your background and figures below, we recommend the above insulin units premeal.</p>
                <hr/>
                {createInput('Carbs', lookUpTable.carbGrams, carbGrams, handleChange)}
                {createInput('Insulin to carb ratio', lookUpTable.insulinToCarb, insulinToCarb, handleChange)}
                {createInput('Insulin Sensitivity', lookUpTable.insulinSensitivity, insulinSensitivity, handleChange)}
                {createInput('Premeal Blood Sugar', lookUpTable.premealBloodSugar, premealBloodSugar, handleChange)}
                {createInput('Actual Blood Sugar', lookUpTable.actualBloodSugar, actualBloodSugar, handleChange)}
            </div>
        </div>
    )
}


export default InsulinResult
