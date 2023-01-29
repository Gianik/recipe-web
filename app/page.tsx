// 'use client'
// import Navbar from "./Navbar"
// import { useState, useEffect, Fragment } from "react";

import { Transition } from "@headlessui/react";
import {  PlusCircleIcon} from "@heroicons/react/24/solid";
import PocketBase from 'pocketbase';
import Image from 'next/image'
import Link from "next/link";
import { request } from "http";
import Dashboard from "./dashboard";
export default async function  HomePage(){

    const pb = new PocketBase('http://127.0.0.1:8090');
    // const [recipeData,setRecipeData] = useState([])


    
      return (
        <div>
          {/* <TopBar showNav={showNav} setShowNav={setShowNav} />
          <Transition
            as={Fragment}
            show={showNav}
            enter="transform transition duration-[400ms]"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform duration-[400ms] transition ease-in-out"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <SideBar showNav={showNav} />
          </Transition>
          <main
            className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "pl-56" : ""
              }`}
          >

                 
              </main> */}
            <Dashboard children={undefined} />
              <div className="flex mt-2">
                  <h1 className="font-bold pl-10 text-3xl mt-2">My Recipes</h1>
                  <Link href='/addrecipe'><button className="bg-blue-800 text-white ml-3 mt-4  px-2 rounded-lg flex"> Add Recipe   <PlusCircleIcon className="w-6 h-6 pl-1 top-1/2 right-0 " /> </button></Link>
                </div>
              <div className="grid lg:grid-cols-4 gap-5 ml-[100px] m-[100px] mt-16 text-white">
                <div className="rounded bg-[#363740] h-40 w-[200px] text-center shadow-sm justify-center object-center">

                        <h3 className=" mt-[60px] text-center">Recipe Name: Lechon </h3>
                </div>
                <div className="rounded bg-[#363740] h-40 w-[200px]  shadow-sm"></div>
                <div className="rounded bg-[#363740] h-40 w-[200px]  shadow-sm"></div>
                <div className="rounded bg-[#363740] h-40 w-[200px]  shadow-sm"></div>
                <div className="rounded bg-[#363740] h-40 w-[200px]  shadow-sm"></div>
                
            </div>
            
        </div>
      );
    }



// export default HomePage