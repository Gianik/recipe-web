'use client'

import React, { FormEvent, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";



export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    //handle the form submit to login user
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Email:" + email)
        console.log("Password:" + password)
        console.log("Full Name:" + fullName)
        setEmail("")
        setPassword("")
        setFullName("")
    };
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


    return (
        <div>
            <section className="bg-gray-400 min-h-screen flex items-center justify-center">
                {/* login container */}
                <div className="bg-[#363740] text-[#A4A6B3] flex rounded-2xl shadow-lg max-w-3xl p-5 ">
                    {/* form div  */}
                    <div className="md:w-50 px-4 divide-y">
                        <div>
                            <h2 className="font-bold text-2xl">Recipe Blog</h2>
                        </div>
                        <div>
                            <p className="text-xs mt-4">Register to Recipe Blog</p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
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
                                        className="p-1 rounded-lg text-black"
                                        value={password}
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button onClick={handleShowPassword}>{showPassword ? (<EyeIcon className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2" />) : (<EyeSlashIcon className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2" />)}</button>
                                </div>
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

                                <p className="text-xs mt-4">Have account already? Login</p>
                          
                            </form>
                        </div>
                    </div>
                    
                </div>
              
            </section>
        </div>
    );
};
