

import {  PlusCircleIcon,PencilSquareIcon,TrashIcon} from "@heroicons/react/24/solid";
import PocketBase from 'pocketbase';
import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import Dashboard from "../../dashboard";

async function getRecipes(recipeId: string) {
        const pb = new PocketBase(process.env.PB_LINK);
        const data = await pb.collection('recipes').getOne(`${recipeId}`)
        // console.log(data.recipe_ingredients)
        // data.recipe_ingredients.map((x, i) => {
        //     console.log(x.Ingredient)
        // })
        return data
}

export default async  function  HomePage({ params }: any){
    const recipe = await getRecipes(params.recipeId)

    
      return (
          <div>
            {/* <ToastContainer /> */}
            <Dashboard children={undefined} />
              <div className="flex mt-2 text-center justify-center">
                  <h1 className="font-bold pl-10 text-3xl mt-2">My Recipes</h1>
                  <Link href={`recipe/${recipe.id}/editrecipe/${recipe.id}`}><button className="bg-yellow-500 text-white ml-3 mt-4  px-2 rounded-lg flex"> Edit Recipe   <PencilSquareIcon className="w-6 h-6 pl-1 top-1/2 right-0 " /> </button></Link>
                  <Link href='#'><button className="bg-red-500 text-white ml-3 mt-4  px-2 rounded-lg flex"> Delete Recipe   <TrashIcon className="w-6 h-6 pl-1 top-1/2 right-0 " /> </button></Link>
                </div>
              <div className="flex items-center justify-center gap-5 ml-[100px] m-[100px] mt-16 text-white">
                    <div  className="rounded flex flex-col bg-[#363740] h-40 w-[400px] text-white text-center shadow-sm justify-center object-center" >
                        <h2 className=" mt-[0px] text-center">Recipe: {recipe.recipe_name}</h2>
                        <hr className="w-full mt-1" />
                        Ingredient List:
                        {recipe.recipe_ingredients.map((x, i) => {
                            return (

                                <ul key={i} className="text-center  list-disc list-inside">
                                    <li>{x.Ingredient}</li>
                                </ul>
                            );
                        })}
                        <hr className="w-full mt-1" />
                        Instructions :
                        {recipe.recipe_instructions.map((x, i) => {
                            return (

                                <ul key={i} className="text-center  list-decimal list-inside">
                                    <li>{x.Instruction}</li>
                                </ul>
                            );
                        })}
                </div>
            </div>
            
        </div>
      );
    }