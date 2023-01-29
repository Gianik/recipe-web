

import {  PlusCircleIcon} from "@heroicons/react/24/solid";
import PocketBase from 'pocketbase';

import Link from "next/link";
import Dashboard from "../dashboard";
import { toast, ToastContainer } from 'react-toastify';
async function getRecipes(authorId: string) {
        const pb = new PocketBase(process.env.PB_LINK);
        const data = await pb.collection('recipes').getFullList(30, {
          filter: `recipe_author="${authorId}"`
        })
        // console.log(data)
        return data
}

export default async  function  HomePage({ params }: any){
    const recipes = await getRecipes(params.userId)

    
      return (
          <div>
            {/* <ToastContainer /> */}
            <Dashboard children={undefined} />
              <div className="flex mt-2 text-center justify-center">
                  <h1 className="font-bold pl-10 text-3xl mt-2">My Recipes</h1>
                  <Link href='/addrecipe'><button className="bg-blue-800 text-white ml-3 mt-4  px-2 rounded-lg flex"> Add Recipe   <PlusCircleIcon className="w-6 h-6 pl-1 top-1/2 right-0 " /> </button></Link>
                </div>
              <div className="grid lg:grid-cols-4 gap-5 ml-[100px] m-[100px] mt-16 text-white">
                  {recipes.map((x,i) => {
                      return (
                          <Link href={`/recipe/${x.id}`}>
                            <div key={i} className="rounded flex flex-col bg-[#363740] h-40 w-[200px] text-white text-center shadow-sm justify-center object-center" >
                                <h2 className=" mt-[10px] text-center">{x.recipe_name}</h2>
                              </div>
                          </Link>
                    )
                  })}
            </div>
            
        </div>
      );
    }