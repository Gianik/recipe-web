'use client'

import React, { FormEvent, useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation"
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import PocketBase from 'pocketbase';
import { validate } from "./validate"

export default function LoginPage(props:any) {

    const router = useRouter();
    const pb = new PocketBase('http://127.0.0.1:8090');
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    
    //handle the form submit to login user
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()
        email.trim()
        password.trim()
        let valid: any = validate({ email, password })
        if (valid.validate == true) {
            setErrorMessage("")
            const pb = new PocketBase(process.env.PB_LINK);
            await pb.collection('users').authWithPassword(
                email,
                password,
            ).then(data => {
                console.log(data.record)
                
                let userData = {
                    avatar:data.record.avatar,
                    id: data.record.id,
                    name: data.record.name,
                    role:data.record.role
                }
                localStorage.setItem('user', JSON.stringify(userData))
                setEmail("")
                setPassword("")
                router.push(`/${data}`)

            }).catch(error => {
                if (error.data.code == 400) {
                    setErrorMessage("User not found please try again or register")
                }
                else {
                    setErrorMessage("Server error")
                }
            })
        }
        else {
            setErrorMessage(valid.message)
        }
        
    }

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
          <ToastContainer/>
          <section className="bg-gray-400 min-h-screen flex items-center justify-center">
              {/* login container */}
              <div className="bg-[#363740] text-[#A4A6B3] flex rounded-2xl shadow-lg max-w-3xl p-5 ">
                  {/* form div  */}
                  <div className="md:w-50  max w-[205px] px-4 divide-y">
                      <div>
                        <h2 className="font-bold text-2xl">Recipe Blog</h2>
                      </div>
                      <div>
                        <p className="text-xs mt-4">Login to your Recipe Blog</p>
                        <div className="relative flex">
                            <h6 className="text-center break-normal text-red-600 ">{ errorMessage }</h6>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                        <input
                                type="email"
                                className="p-1 mt-4 rounded-lg text-black"    
                                value={email}
                                placeholder="Email"
                                onChange={(e)=> setEmail(e.target.value)}
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
