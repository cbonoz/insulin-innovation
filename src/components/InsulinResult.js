import React, { Component, useEffect } from 'react'
import InsulinCalculator from "../util/insulinCalculator";

const InsulinResult = props => {
    const { food } = this.props
    const { nutrition } = food
    const { totalCarbs } = nutrition
    const carbGrams = totalCarbs * 100;
    useEffect(() => {
        InsulinCalculator(carbGrams, 10, 50, premealBloodSugar, actualBloodSugar, medication, "white")
    }, [])

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
