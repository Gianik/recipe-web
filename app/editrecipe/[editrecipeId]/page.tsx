'use client'

import { useState, FormEvent,useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import {  PlusCircleIcon,MinusCircleIcon} from "@heroicons/react/24/solid";
import Dashboard from "../../dashboard";
import { useRouter } from "next/navigation"
import PocketBase from 'pocketbase';
import { validate } from '../../addrecipe/validate';
import { toastError, toastSuccess } from '../../../components/toast';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditRecipe(params:any) {
    const router = useRouter();
    const pb = new PocketBase('http://127.0.0.1:8090');
    const searchParams = useSearchParams();
    // fetchData()
    const [ingredientlist, setIngredientlist] = useState([{ Ingredient: "" }]);
    const [recipeName,setRecipeName] = useState("")
    const [instructionList, setInstructionList] = useState([{ Instruction: "" }]);
    useEffect(() => {
      fetchData()
    }, []);
  
     async function fetchData() {
       console.log("test")
       const data = await pb.collection('recipes').getOne(`${params.params.editrecipeId}`,{ '$autoCancel': false } )
       console.log(data.recipe_name)
       setRecipeName(data.recipe_name)
       setIngredientlist(data.recipe_ingredients)
       setInstructionList(data.recipe_instructions)
    }

      // handle input change for Ingredients and Instructions
    const handleInputChange = (e: any, index: any) => {
      
      const { name, value } = e.target;
      if (name == "Ingredient") {
        const list = [...ingredientlist];
        list[index][name] = value;
        setIngredientlist(list);
      }
      else if (name == "Instruction") {
        const list = [...instructionList];
        list[index][name] = value;
        setInstructionList(list);
      }
    };
      
    //handle click event for the Remove button for Ingredients
    const handleIngredientRemoveClick = index => {
      const list = [...ingredientlist];
      list.splice(index, 1);
      setIngredientlist(list);
    };
    //handle click event for the Remove button for Instruction
    const handleInstructionRemoveClick = index => {
    const list = [...instructionList];
    list.splice(index, 1);
    setInstructionList(list);
      };    
      // handle click event for the Add button for Ingredients
      const handleIngredientAddClick = () => {
        setIngredientlist([...ingredientlist, { Ingredient: "" }]);
      };
      // handle click event for the Add button for Instruction
      const handleInstructionAddClick = () => {
        setInstructionList([...instructionList, { Instruction: "" }]);
  };
  //handle submition of form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let user_id = JSON.parse(localStorage.getItem('user') || '').id
    recipeName.trim()
    let valid:any = validate({recipeName,ingredientlist,instructionList})
    console.log(valid)
    if (valid == true) {
        console.log(params.params.editrecipeId)
        await pb.collection('recipes').update(`${params.params.editrecipeId}`,{
        recipe_name: recipeName,
        recipe_ingredients: ingredientlist ,
        recipe_instructions:  instructionList ,

        }).then(data => {
          console.log(data)
          toastSuccess('Recipe Updated!')
          router.push(`recipe/${params.params.editrecipeId}`)
        })
          .catch(error => {
            console.log(error)
            toastError('Server Error Please try Again')
          });

    }

  };
      return (
        <>
          <ToastContainer />
            <Dashboard children={""} />
              <div className="  flex flex-col items-center justify-center text-white font-bold mb-[300px]">
                <div className="rounded-xl bg-[#363740]  w-[300px] items-center text-center mt-10 ">
                      New Recipe
                      <hr />
                      <form onSubmit={handleSubmit} className="flex flex-col gap-0 mt-0 items-center">
                        Recipe Name:
                        <input
                                type="text"
                                className="p-1 mt-2 flex rounded-lg text-black"    
                                value={recipeName}
                                placeholder="Recipe Name"
                                onChange={(e)=> setRecipeName(e.target.value)}
                          />
                          <hr className="w-full mt-1" />
                          Ingredient List:
                            
                           {ingredientlist.map((x, i) => {
                              return (
                                <div key={i} className="m-0 flex flex-col">
                                    <input
                                    name="Ingredient"
                                    className="mr-6 flex rounded-lg p-1 text-black"        
                                    placeholder="Ingredient"
                                    value={x.Ingredient}
                                    onChange={e => handleInputChange(e, i)}
                                    />
                                      <div className="relative">
                                        {ingredientlist.length !== 1 && <button type="button" className="" onClick={() => handleIngredientRemoveClick(i)}><MinusCircleIcon className=" w-5 h-5 absolute -top-[25px] -right-7 " /></button>} 
                                        {ingredientlist.length - 1 === i && <button type="button" className="" onClick={handleIngredientAddClick}><PlusCircleIcon className=" w-5 h-5 absolute -top-[25px] -right-1  " /></button>}

                                    </div>
                                </div>
                             );
                          })}
                          
                          <hr className="w-full mt-1" />
                           Instructions:
                           {instructionList.map((x, i) => {
                              return (
                                <div key={i} className="m-0 flex flex-col">
                                    <input
                                    name="Instruction"
                                    className="mr-6 flex rounded-lg p-1 text-black"        
                                    placeholder="Instruction"
                                    value={x.Instruction}
                                    onChange={e => handleInputChange(e, i)}
                                    />
                                      <div className="relative">
                                        {instructionList.length !== 1 && <button type="button" className="" onClick={() => handleInstructionRemoveClick(i)}><MinusCircleIcon className=" w-5 h-5 absolute -top-[25px] -right-7 " /></button>} 
                                        {instructionList.length - 1 === i && <button type="button" className="" onClick={handleInstructionAddClick}><PlusCircleIcon className=" w-5 h-5 absolute -top-[25px] -right-1  " /></button>}

                                    </div>
                                </div>
                             );
                          })}
                        <hr className="w-full mt-1" />
                        <button type="submit" className="bg-blue-800 text-white font-bold mt-2 mb-2 py-2 px-4 rounded-lg">
                                Add Recipe 
                        </button>
                      </form>
                </div>

                
            </div>
            
        </>
      );
    }



export default EditRecipe