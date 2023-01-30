'use client'

import React, { FormEvent, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import PocketBase from 'pocketbase';
import Link from "next/link";
import { validate } from "./validate"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

    const router = useRouter();
    const pb = new PocketBase('http://127.0.0.1:8090');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("")
    const [fullName, setFullName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    
    //handle the form submit to login user
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
                emailVisibility:true
            }).then(data => {
                console.log(data)
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setFullName("")
                notify()
                router.push('/login')

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
    //handle showPassword State
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
    //change showConfirmPassword state
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
    const notify = () => { // Show a toast if the registration is successful in the login page
        toast.success("Registration Successful you can now Login !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    }

    return (
        <div>
            <section className="bg-gray-400 min-h-screen flex items-center justify-center">
                {/* login container */}
                <div className="bg-[#363740] text-[#A4A6B3] flex rounded-2xl shadow-lg max-w-3xl p-5 ">
                    {/* form div  */}
                    <div className="md:w-50  max w-[205px]  px-4 divide-y">
                        <div>
                            <h2 className="font-bold text-2xl">Recipe Blog</h2>
                        </div>
                        <div>
                            <p className="text-xs mt-4">Register to Recipe Blog</p>
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

                                <p className="text-xs mt-4 text-center">Have account already? <Link href={"/login"} className="text-blue-500">Login</Link></p>
                          
                            </form>
                        </div>
                    </div>
                    
                </div>
              
            </section>
            
        </div>
    );
};
