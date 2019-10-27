import React, { Component } from 'react'

export default class InsulinResult extends Component {
    render() {
        const { food } = this.props
        const { nutrition } = food
        const { totalCarbs } = nutrition

        return (
            <div className='insulin-result'>
               <p>{JSON.stringify(food)}</p> 
               <br/>
               <p>Carbs: {totalCarbs}</p>
            </div>
        )
    }
}
