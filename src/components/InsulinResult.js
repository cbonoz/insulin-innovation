import React, { useEffect, useState, useCallback } from 'react'
import InsulinCalculator from "../util/insulinCalculator";

const lookUpTable = {
    carbGrams: "carbGrams",
    insulinToCarb: "insulinToCarb",
    insulinSensitivity: "insulinSensitivity",
    premealBloodSugar: "premealBloodSugar",
    actualBloodSugar: "actualBloodSugar",
}

const InsulinResult = props => {
    let totalCarbs;
    if (props.food) {
        const { food } = props
        const { nutrition } = food
        totalCarbs = nutrition.totalCarbs;
    }
    const [carbGrams, setCarbGrams] = useState(totalCarbs * 100 || 50);
    const [insulinToCarb, setInsulinToCarb] = useState(10);
    const [insulinSensitivity, setInsulinSensitivity] = useState(50);
    const [premealBloodSugar, setPremealBloodSugar] = useState(80);
    const [actualBloodSugar, setActualBloodSugar] = useState(140);

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
