import React, { useState } from 'react'
import { Modal, Label, TextInput, Button } from 'flowbite-react';
import { authState } from '../context/AuthContext';
import apiurl from './apiurl';
import axios from 'axios';
import { alertState } from '../context/AlertContext';

const RegisterComponent = () => {
    const { setOpenLoginModal, openLoginModal, openRegisterModal, setOpenRegisterModal } = authState();
    const { setAlert } = alertState();

    const [creds, setCreds] = useState({ username: "raseek", password: "raseek" })

    const handleRegister = async () => {
        try {
            if (creds.password !== creds.confirmPassword) {
                alert("password and confirm password must be same");
                return
            }
            const { data } = await axios.post(apiurl + "/api/users/register/", creds)
            setAlert({ type: "success", message: String(data?.message) + " login available now" })
            setOpenRegisterModal(false)
            console.log(data)

        } catch (err) {
            console.log(err)
            setAlert({ type: "failure", message: err?.response?.data?.message || err?.message || "Register error " })
        }

    }

    return (
        <>
            {/* <button onClick={() => setOpenRegisterModal(true)} className='bg-red-500 px-3 py-1 rounded text-cyan-100'>Sign In</button> */}
            <Modal show={openRegisterModal} size="md" popup onClose={() => setOpenRegisterModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Register</h3>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="username" value="Your username" />
                            </div>
                            <TextInput id="username" placeholder="johndoe" value={creds.username} onChange={(e) => { setCreds({ ...creds, username: e.target.value }) }} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Password" />
                            </div>
                            <TextInput id="password" type="password" value={creds.password} onChange={(e) => { setCreds({ ...creds, password: e.target.value }) }} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Confirm password" />
                            </div>
                            <TextInput id="password1" type="password" value={creds.confirmPassword} onChange={(e) => { setCreds({ ...creds, confirmPassword: e.target.value }) }} required />
                        </div>


                        <div className="w-full">
                            <Button onClick={handleRegister}>Register</Button>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already Registered?&nbsp;
                            <a href="#Login" className="text-cyan-700 hover:underline dark:text-cyan-500"
                                onClick={() => { setOpenLoginModal(true); setOpenRegisterModal(false) }}
                            >
                                Login
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default RegisterComponent