import React, { Component, useEffect } from 'react'
import InsulinCalculator from "../util/insulinCalculator";

const InsulinResult = props => {
    const { food } = props
    const { nutrition } = food
    const { totalCarbs } = nutrition
    const carbGrams = totalCarbs * 100;
    useEffect(() => {
        console.log('dat', InsulinCalculator(carbGrams, 10, 50, 80, 140, null, "white"))
    }, [carbGrams]);

    return (
        <div className='insulin-result'>
            <p>{JSON.stringify(food)}</p>
            <br/>
            <h2>Insulin Sensitivity</h2>
            <p>Carbs: {totalCarbs * 100}</p>
        </div>
    )
}


export default InsulinResult;
