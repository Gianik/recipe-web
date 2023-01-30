'use client'

import { useState, FormEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Dashboard from "../dashboard";
import { useRouter } from "next/navigation"
import PocketBase from 'pocketbase';
import { validate } from '../register/validate';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddUser() {
    const router = useRouter();
    const pb = new PocketBase(process.env.PB_LINK);    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("")
    const [fullName, setFullName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    //change showPassword state to change icon
    const handleShowPassword = (e:any) => {
        e.preventDefault()
        if (showPassword === true) {
            setShowPassword(false)
            return
        }
        else {
            setShowPassword(true)
            return
        }

    };
    //change showConfirmPassword state to change icon
    const handleShowConfirmPassword = (e:any) => {
        e.preventDefault()
        if (showConfirmPassword === true) {
            setShowConfirmPassword(false)
            return
        }
        else {
            setShowConfirmPassword(true)
            return
        }

    };
    // handle form submit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        email.trim()
        password.trim()
        confirmPassword.trim()
        fullName.trim()
        let valid: any = validate({ email, password, confirmPassword, fullName })
        if (valid.validate == true) {
            setErrorMessage("")
            await pb.collection('users').create({
                name: fullName,
                email: email,
                password: password,
                passwordConfirm: confirmPassword,
                role: 'user',
                emailVisibility: true
            }).then(data => {
                console.log(data)
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setFullName("")
                router.push('/adminusers')

            })
                .catch(error => {
                    console.log(error.data.code)
                    if (error.data.code == 400) {
                        setErrorMessage("Email already exists please login or try another email")
                    }
                    else {
                        setErrorMessage("Server error")
                    }

                })

        } else {
            setErrorMessage(valid.message)
        }
    };
      
    
      return (
        <>
          <ToastContainer />
            <Dashboard children={""} />
            <div>
            <section className="bg-gray-400 mt-[100px] flex items-center justify-center">
                {/* login container */}
                <div className="bg-[#363740] text-[#A4A6B3] flex rounded-2xl shadow-lg max-w-3xl p-5 ">
                    {/* form div  */}
                    <div className="md:w-50  max w-[205px]  px-4 divide-y">
                        <div>
                            <h2 className="font-bold text-2xl">Add New User</h2>
                        </div>
                        <div>

                            <div className="relative flex">
                                <h6 className="text-center break-normal text-red-600 ">{ errorMessage }</h6>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2" noValidate>
                                <input
                                    type="email"
                                    className="p-1 mt-4 rounded-lg text-black"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text": "password"}
                                        className="p-1 rounded-lg text-black w-full"
                                        value={password}
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button onClick={handleShowPassword}>{showPassword ? (<EyeIcon className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2" />) : (<EyeSlashIcon className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2" />)}</button>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text": "password"}
                                        className="p-1 rounded-lg text-black w-full"
                                        value={confirmPassword}
                                        placeholder="Confirm Password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button onClick={handleShowConfirmPassword}>{showConfirmPassword ? (<EyeIcon className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2" />) : (<EyeSlashIcon className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2" />)}</button>
                                </div>
                                <p className=" mt-1 text-center text-[12px] leading-3 ">-Password should atleast contain five characters</p>
                                <input
                                    type="text"
                                    className="p-1 rounded-lg text-black"
                                    value={fullName}
                                    placeholder="Full Name"
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                <button type="submit" className="bg-blue-800 text-white font-bold py-2 px-4 rounded-lg">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                    
                </div>
              
            </section>
            
        </div>
            
        </>
      );
    }



export default AddUser