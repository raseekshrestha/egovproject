import React, { useState } from 'react'
import { authState } from '../context/AuthContext'
import { useEffect } from 'react';
import GaugeCard from './GaugeCard';
import axios from 'axios';
import apiurl from './apiurl';
import AddModal from './AddModal'
import EditComponent from './EditModal';


const Home = () => {
    const { isLoggedIn, setOpenLoginModal, refresh } = authState();
    useEffect(() => {
        if (!isLoggedIn) {
            setOpenLoginModal(true)
        }
    }, [isLoggedIn])

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchReservoir()
        }, 10000)

        return () => clearInterval(intervalId);

    }, [])

    const [reservoirs, setReservoirs] = useState([])


    const fetchReservoir = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await axios.get(`${apiurl}/api/reservoir`, config)
            setReservoirs(response.data.data)
        } catch (err) {
            console.log(err)
            setReservoirs([])
        }


    }
    useEffect(() => {
        fetchReservoir()
    }, [refresh])

    return (
        <>
            <div className='container mx-auto mt-4'>
                <h1 className='text-3xl dark:text-white font-extrabold text-center'>
                    National Reservoir level and Capacity Monitoring System
                </h1>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-5'>
                    {reservoirs.map(reservoir => (
                        <div>
                            <GaugeCard reservoir={reservoir} />
                        </div>

                    ))}





                </div>
                <AddModal />
                <EditComponent />

            </div>
        </>
    )
}

export default Home