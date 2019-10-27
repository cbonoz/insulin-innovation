import React, { Component } from 'react'
import InsulinCalculator from "../util/insulinCalculator";

export default class InsulinResult extends Component {
    render() {
        const { food } = this.props
        const { nutrition } = food
        const { totalCarbs } = nutrition

        return (
            <div className='insulin-result'>
               <p>{JSON.stringify(food)}</p>
               <br/>
               <h2>Insulin Sensitivity</h2>
               <p>Carbs: {totalCarbs * 100}</p>
            </div>
        )
    }
}
