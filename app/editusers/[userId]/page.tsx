'use client'
import React, { FormEvent, useState,useEffect } from "react";
import Dashboard from "../../dashboard";
import { useRouter } from "next/navigation"
import PocketBase from 'pocketbase';
import { toastError } from '../../../components/toast';
import { validate } from '../../profile/validate'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditUser(params:any) {
    const router = useRouter();
    const pb = new PocketBase(process.env.PB_LINK);
    const user = localStorage.getItem('user') || '';
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [roleSelect, setRoleSelect] = useState("");

    useEffect(() => { 
        const user = localStorage.getItem('user') || ''
        if (user == "") {
            router.push('/login')
        }
        fetchData()
    }, []);
    
    const fetchData = async () => { //fetch the data
        const data = await pb.collection('users').getOne(`${params.params.userId}`, { '$autoCancel': false });
        setEmail(data.email);
        setFullName(data.name);
        setRoleSelect(data.role);
    };

     //handle submition of form
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        email.trim();
        fullName.trim();
        let valid = validate({ email, fullName })
        if (valid.validate == true) {
            await pb.collection('users').update(`${params.params.userId}`, {
                name: fullName,
                email: email,
                role: roleSelect
            }).then(data => {
                router.push(`user/${params.params.userId}`);
            }).catch(error => {
                console.log(error)
                if (error.data.code == 404) {
                    toastError("User not found please try again");
                }
                else {
                    toastError("Server Error please try again");
                }
            })
        } else {
            toastError(valid.message);
        }
    };




      return (
          <>
            <ToastContainer />
            <Dashboard children={""} />
            <div className="  flex flex-col items-center justify-center text-white font-bold mb-[300px]">
                <div className="rounded-xl bg-[#363740]  w-[300px] items-center text-center mt-10 ">
                      Update Details
                    <hr />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-0 mt-0 items-center">
                        Email:
                        <input
                            type="text"
                            className="p-1 mb-3 mt-2 flex rounded-lg text-black"    
                            value={email}
                            placeholder="Email"
                            onChange={(e)=> setEmail(e.target.value)}
                          />
                        <hr className="w-full" />
                        Full Name:
                        <input
                            type="text"
                            className="p-1 mt-2 mb-3 flex rounded-lg text-black"    
                            value={fullName}
                            placeholder="Full Name"
                            onChange={(e)=> setFullName(e.target.value)}
                        />
                        <hr className="w-full" />
                        <select className="text-black mt-2 rounded-lg" onChange={(e)=> setRoleSelect(e.target.value)} value={roleSelect}>
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                        </select> 
                        <button type="submit" className="bg-blue-800 text-white mb-2 mt-2 font-bold py-2 px-4 rounded-lg">
                                Update 
                        </button>
                    </form>
                </div>
            </div>
      
        </>
      );
    }



export default EditUser