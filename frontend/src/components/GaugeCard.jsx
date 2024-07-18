import { Card } from 'flowbite-react'
import React from 'react'
import GaugeChart from 'react-gauge-chart'

const GaugeCard = ({ reservoir }) => {
    // alert(reservoir.currentLevel)
    return (
        <>
            <Card className='dark:text-white'>
                <h1 className='text-center dark:text-white text-2xl'>{reservoir.name} ({reservoir.location})</h1>
                <GaugeChart id={reservoir._id}
                    nrOfLevels={20}
                    colors={["#b21b0c", "#23ad49"]}
                    percent={reservoir.currentLevel / reservoir.capacity}
                />
                <hr />
                <div>
                    <h1 className='text-xl'>Details</h1>
                    <p>Total Capacity: {reservoir.capacity} Litre</p>
                    <p>Current Level: {reservoir.currentLevel} Litre</p>
                    <p>
                        {(reservoir.currentLevel / reservoir.capacity) < 0.2 ?
                            <div className='bg-orange-500 text-black'>water level low</div> :
                            <div className='invisible'>..</div>}
                    </p>
                </div>
            </Card>
        </>
    )
}

export default GaugeCard