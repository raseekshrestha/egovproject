import React, { useState } from 'react'
import { Modal, Label, TextInput, Button } from 'flowbite-react';
import { authState } from '../context/AuthContext';
import apiurl from './apiurl';
import axios from 'axios';
import { alertState } from '../context/AlertContext';
// import { FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";



const EditComponent = () => {
    const { selectedReservour, setSelectedReservour, setRefresh } = authState();
    const { setAlert } = alertState();

    const handleEdit = async () => {
        try {
            if (!selectedReservour.name || !selectedReservour.location || !selectedReservour.capacity || !selectedReservour.currentLevel) {
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
                const { data } = await axios.put(apiurl + `/api/reservoir/` + selectedReservour._id, selectedReservour, config)
                setAlert({ type: "success", message: data.message })
            } catch (err) {
                setAlert({ type: "failure", message: err.response.data.message })
            }
            setSelectedReservour(null);

            setRefresh(Math.random())


        } catch (err) {
            console.log(err)
            setAlert({ type: "failure", message: err?.response?.data?.message || err?.message || "Register error " })
        }


    }

    const handleDelete = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.delete(apiurl + `/api/reservoir/` + selectedReservour._id, config)
            setAlert({ type: "success", message: data.message })

        } catch (error) {
            console.log(error)
            setAlert({ type: "failure", message: error.response.data.message })
        }
        setRefresh(Math.random())
        setSelectedReservour(null)

    }

    return (
        <>
            {selectedReservour &&
                <Modal show={Boolean(selectedReservour)} size="md" popup onClose={() => setSelectedReservour(null)}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Reservior</h3>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Reserviour Name" />
                                </div>
                                <TextInput id="name" placeholder="name" value={selectedReservour.name} onChange={(e) => { setSelectedReservour({ ...selectedReservour, name: e.target.value }) }} required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="location" value="location" />
                                </div>
                                <TextInput id="location" type="text" value={selectedReservour.location} onChange={(e) => { setSelectedReservour({ ...selectedReservour, location: e.target.value }) }} required />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="capacity" value="capacity" />
                                </div>
                                <TextInput id="capacity" type="number" value={selectedReservour.capacity} onChange={(e) => { setSelectedReservour({ ...selectedReservour, capacity: e.target.value }) }} required />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="currentLevel" value="currentLevel" />
                                </div>
                                <TextInput id="currentLevel" type="number" value={selectedReservour.currentLevel} onChange={(e) => { setSelectedReservour({ ...selectedReservour, currentLevel: e.target.value }) }} required />
                            </div>

                            <Modal.Footer>

                                <Button onClick={handleEdit}>Edit</Button>

                                <Button color='failure' onClick={handleDelete}>
                                    <FaTrashAlt />  Delete
                                </Button>

                            </Modal.Footer>

                        </div>
                    </Modal.Body>
                </Modal>

            }
        </>
    );
}

export default EditComponent