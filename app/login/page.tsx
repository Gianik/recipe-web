'use client'

import React, { FormEvent, useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation"
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";


export default function LoginPage(props:any) {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    
    //handle the form submit to login user
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Email:" + email)
        console.log("Password:"+password)
    }



  return (
      <div>
          <ToastContainer/>
          <section className="bg-gray-400 min-h-screen flex items-center justify-center">
              {/* login container */}
              <div className="bg-[#363740] text-[#A4A6B3] flex rounded-2xl shadow-lg max-w-3xl p-5 ">
                  {/* form div  */}
                  <div className="md:w-50 px-4 divide-y">
                      <div>
                        <h2 className="font-bold text-2xl">Recipe Blog</h2>
                      </div>
                      <div>
                        <p className="text-xs mt-4">Login to your Recipe Blog</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                        <input
                                type="email"
                                className="p-1 mt-4 rounded-lg"    
                                value={email}
                                placeholder="Email"
                                onChange={(e)=> setEmail(e.target.value)}
                            />

                            
                            <input
                                type="password"
                                className="p-1 rounded-lg"        
                                value={password}
                                placeholder="Password"
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                            <button type="submit" className="bg-blue-800 text-white font-bold py-2 px-4 rounded-lg">
                                Login 
                            </button>

                            <p className="text-xs mt-4">No account yet? <Link href={"/register"} className="text-blue-500">Register One Now</Link></p>
                          
                          </form>
                          </div>
                  </div>
                    
              </div>
              
          </section>
    </div>
  )
}
