'use client'
import React, { FormEvent, useState } from "react";
import Dashboard from "../dashboard";
import { useRouter } from "next/navigation"
import PocketBase from 'pocketbase';
import { toastError, toastSuccess } from '../../components/toast';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddRecipe(params:any) {
    const router = useRouter();
    const pb = new PocketBase('http://127.0.0.1:8090');
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem('user') || '').email);
    const [fullName, setFullName] = useState(JSON.parse(localStorage.getItem('user') || '').name);

    // console.log(params.params.recipeId)

      // handle input change for Ingredients and Instructions

//   //handle submition of form
//   const handleDelete = async (e:any) => {
//     e.preventDefault()
//     let user_id = JSON.parse(localStorage.getItem('user') || '').id
//       await pb.collection('recipes').delete(`${params.params.recipeId}`)
//           .then(data => {
//             router.push(`/${user_id}`)
//           }).catch(error => {
//           toastError("Delete Cancelled please try again")
//       })
      

    // }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        return
    }


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
                    </form>
                </div>
            </div>



            
        </>
      );
    }



export default AddRecipe