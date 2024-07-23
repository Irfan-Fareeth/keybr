import React from 'react'
import Accuracy from '../accuracy/accuracy'
import Changemode from '../changemode/changemode'
import CustomWords from '../custom words/custom words button'
import Highestwpm from '../higheswpm/highestwpm'
const settings = () => {
  return (
    <div>
       <Accuracy />
        <Highestwpm />
        <Changemode />
        <CustomWords />
    </div>
  )
}

export default settings
