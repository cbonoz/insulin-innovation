import React, { Component } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
export default class FoodAccordion extends Component {


    render() {
        const { results, setFood } = this.props

        const topResults = results.slice(0, Math.min(5, results.length))

        return (
            <div className='food-accordion'>
                <h1 className='food-accordion-header'>Select Food</h1>
                <Accordion>
                    {topResults.map((r, i) => {
                        return <AccordionItem key={i}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    <div className='food-accordion-group'>
                                        {r.group}
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                {r.items.map((item, j) => {
                                    return <div key={j} className='food-accordion-item' onClick={() => {
                                        const selected = topResults[i].items[j]
                                        console.log(i, j, selected)
                                        setFood(selected)
                                    }}>
                                        {item.name}
                                    </div>
                                })}
                            </AccordionItemPanel>
                        </AccordionItem>
                    })}
                </Accordion>

            </div>
        )
    }
}
