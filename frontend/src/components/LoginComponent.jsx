import React, { useState } from 'react'
import { Modal, Label, TextInput, Button } from 'flowbite-react';
import { authState } from '../context/AuthContext';
import apiurl from './apiurl';
import axios from 'axios';
import { alertState } from '../context/AlertContext';
import RegisterComponent from './RegisterComponent';

const LoginComponent = () => {
    const { setOpenLoginModal, openLoginModal, setOpenRegisterModal, setIsLoggedIn, setUser, setToken } = authState();
    const { setAlert } = alertState();

    const [creds, setCreds] = useState({ usernameOrEmail: "admin", password: "123" })

    const handleLogin = async () => {
        try {
            if (!creds.password || !creds.usernameOrEmail) {
                alert("both password and username required to login");
                return
            }
            const { data } = await axios.post(apiurl + "/api/users/login/", creds)
            setIsLoggedIn(true);
            setUser(data.user);
            setToken(data.token)

            localStorage.setItem("user", JSON.stringify(data.user))
            localStorage.setItem("token", data.token)

            setAlert({ type: "success", message: String(data?.message) })
            setOpenLoginModal(false)
            console.log(data)

        } catch (err) {
            console.log(err)
            setAlert({ type: "failure", message: err?.response?.data?.message || err?.message || "Register error " })
        }


    }

    return (
        <>
            <button onClick={() => setOpenLoginModal(true)} className='bg-red-500 px-3 py-1 rounded text-cyan-100'>Sign In</button>
            <Modal show={openLoginModal} size="md" popup onClose={() => setOpenLoginModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in</h3>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Your email" />
                            </div>
                            <TextInput id="email" placeholder="name@company.com" value={creds.usernameOrEmail} onChange={(e) => { setCreds({ ...creds, usernameOrEmail: e.target.value }) }} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Your password" />
                            </div>
                            <TextInput id="password" type="password" value={creds.password} onChange={(e) => { setCreds({ ...creds, password: e.target.value }) }} required />
                        </div>


                        <div className="w-full">
                            <Button onClick={handleLogin}>Log in</Button>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?&nbsp;
                            <a href="#Register" className="text-cyan-700 hover:underline dark:text-cyan-500"
                                onClick={() => { setOpenRegisterModal(true); setOpenLoginModal(false) }}
                            >
                                Create account
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* for register */}
            <RegisterComponent />

        </>
    );
}

export default LoginComponent