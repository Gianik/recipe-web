'use client'
                                                                                                                                                                                                                                                                                                                                                                                  
import Dashboard from "../../dashboard";
import { useRouter } from "next/navigation"
import PocketBase from 'pocketbase';
import { toastError } from '../../../components/toast';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function DeleteRecipe(params:any) {
    const router = useRouter();
    const pb = new PocketBase(process.env.PB_LINK);    



  //handle submition of form
  const handleDelete = async (e:any) => {
    e.preventDefault()
    let user_id = JSON.parse(localStorage.getItem('user') || '').id
      await pb.collection('recipes').delete(`${params.params.recipeId}`)
          .then(data => {
            router.push(`/${user_id}`)
          }).catch(error => {
          toastError("Delete Cancelled please try again")
      })
      

    }
    const handleCancel = async (e:any) => {
        e.preventDefault()
        
        router.push(`recipe/${params.params.recipeId}`)
    
    }

      return (
          <>
            <ToastContainer />
            <Dashboard children={""} />
              <div className="  flex flex-col items-center justify-center text-white font-bold mb-[300px]">
                <div className="rounded-xl bg-[#363740]  w-[300px] items-center text-center mt-10 ">
                      Delete Recipe
                      <hr />
                      Are you sure you want to delete the Recipe?
                      <br />
                        <button onClick={handleDelete} className="bg-red-500 text-white font-bold mt-2 mb-2 py-2 px-4 rounded-lg">
                                Delete
                      </button>
                      <button onClick={handleCancel} className="bg-yellow-500 text-white font-bold mt-2 mb-2 ml-2 py-2 px-4 rounded-lg">
                                Cancel
                    </button>
                </div>
              </div>
            
        </>
      );
    }



export default DeleteRecipe