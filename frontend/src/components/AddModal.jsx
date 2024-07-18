import React, { useState } from 'react'
import { Modal, Label, TextInput, Button } from 'flowbite-react';
import { authState } from '../context/AuthContext';
import apiurl from './apiurl';
import axios from 'axios';
import { alertState } from '../context/AlertContext';
import { FaPlus } from "react-icons/fa";


const AddComponent = () => {
    const { setOpenAddModal, openAddModal, setRefresh } = authState();
    const { setAlert } = alertState();
    const [payload, setPayload] = useState({})

    const handleAdd = async () => {
        try {
            if (!payload.name || !payload.location || !payload.capacity || !payload.currentLevel) {
                alert("all fields are required");
                return
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                }
            }
            try {
                const { data } = await axios.post(apiurl + "/api/reservoir/", payload, config)
                setAlert({ type: "success", message: data.message })
            } catch (err) {
                setAlert({ type: "failure", message: err.response.data.message })
            }
            setOpenAddModal(false);

            setRefresh(Math.random())


        } catch (err) {
            console.log(err)
            setAlert({ type: "failure", message: err?.response?.data?.message || err?.message || "Register error " })
        }


    }

    return (
        <>
            <div
                onClick={() => setOpenAddModal(true)} className='bg-red-500 h-[50px] w-[50px] text-cyan-100 absolute bottom-5 right-5 rounded-full cursor-pointer'>
                <div className='relative'>
                    <FaPlus className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] text-2xl' />

                </div>

            </div>
            <Modal show={openAddModal} size="md" popup onClose={() => setOpenAddModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Reservior</h3>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Reserviour Name" />
                            </div>
                            <TextInput id="name" placeholder="name" value={payload.name} onChange={(e) => { setPayload({ ...payload, name: e.target.value }) }} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="location" value="location" />
                            </div>
                            <TextInput id="location" type="text" value={payload.location} onChange={(e) => { setPayload({ ...payload, location: e.target.value }) }} required />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="capacity" value="capacity" />
                            </div>
                            <TextInput id="capacity" type="number" value={payload.capacity} onChange={(e) => { setPayload({ ...payload, capacity: e.target.value }) }} required />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="currentLevel" value="currentLevel" />
                            </div>
                            <TextInput id="currentLevel" type="number" value={payload.currentLevel} onChange={(e) => { setPayload({ ...payload, currentLevel: e.target.value }) }} required />
                        </div>


                        <div className="w-full">
                            <Button onClick={handleAdd}>Add</Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default AddComponent