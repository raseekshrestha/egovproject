import { Card } from 'flowbite-react'
import React from 'react'
import GaugeChart from 'react-gauge-chart'
import { FaEdit } from "react-icons/fa";
import { authState } from '../context/AuthContext';


const GaugeCard = ({ reservoir }) => {
    const { selectedReservour, setSelectedReservour } = authState()

    const handleEdit = () => {
        setSelectedReservour(reservoir)

    }
    return (

        <>
            <Card className='dark:text-white'>
                <h1 className='text-center dark:text-white text-2xl'>
                    {reservoir.name} ({reservoir.location})  &nbsp;<sup>
                        <FaEdit
                            className='inline cursor-pointer text-blue-300'
                            onClick={() => handleEdit(reservoir._id)}
                        />
                    </sup>
                </h1>
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