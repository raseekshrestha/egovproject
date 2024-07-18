import React, { useState } from 'react'
import { authState } from '../context/AuthContext'
import { useEffect } from 'react';
import GaugeCard from './GaugeCard';
import axios from 'axios';
import apiurl from './apiurl';



const Home = () => {
    const { isLoggedIn, setOpenLoginModal, token } = authState();
    useEffect(() => {
        if (!isLoggedIn) {
            setOpenLoginModal(true)
        }
    }, [isLoggedIn])

    const [reservoirs, setReservoirs] = useState([])


    const fetchReservoir = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        }
        console.log(config)
        try {
            const response = await axios.get(`${apiurl}/api/reservoir`, config)
            console.log(response)
            setReservoirs(response.data.data)
            console.log(response.data.data)
        } catch (err) {
            console.log(err)
        }


    }
    useEffect(() => {
        fetchReservoir()
    }, [])

    return (
        <>
            <div className='container mx-auto mt-4'>
                <h1 className='text-3xl dark:text-white font-extrabold text-center'>
                    National Reservoir level and Capacity Monitoring System
                </h1>
                <div className='grid grid-cols-4 gap-4 mt-5'>
                    {reservoirs.map(reservoir => (
                        <div>
                            <GaugeCard reservoir={reservoir} />
                        </div>

                    ))}





                </div>

            </div>
        </>
    )
}

export default Home