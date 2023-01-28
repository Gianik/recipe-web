'use client'
// import Navbar from "./Navbar"
import { useState, useEffect, Fragment } from "react";
import SideBar from "../Sidebar";
import TopBar from "../Topbar";
import { Transition } from "@headlessui/react";
import {  PlusCircleIcon} from "@heroicons/react/24/solid";

import Image from 'next/image'
import Link from "next/link";
function HomePage({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [showNav, setShowNav] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    function handleResize() {
        if (innerWidth <= 640) {
          setShowNav(false);
          setIsMobile(true);
        } else {
          setShowNav(true);
          setIsMobile(false);
        }
      }
    
      useEffect(() => {
        if (typeof window != undefined) {
          addEventListener("resize", handleResize);
        }
    
        return () => {
          removeEventListener("resize", handleResize);
        };
      }, []);
    
      return (
        <>
          <TopBar showNav={showNav} setShowNav={setShowNav} />
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
            className={`pt-16 transition-all duration-[400ms] ${
              showNav && !isMobile ? "pl-56" : ""
            }`}
          >
            <div className="px-4 md:px-16">{children}</div>
                 
              </main>
              <div className="flex mt-2">
                  <h1 className="font-bold pl-10 text-3xl mt-2">Create Recipes</h1>
                  
                </div>
              <div className="grid lg:grid-cols-4 gap-5 ml-[100px] m-[100px] mt-16 text-white">
                <div className="rounded bg-[#363740] h-40 w-[200px] text-center shadow-sm justify-center object-center">
                      <Image src="/../public/maxpepe.jpg" className="content-center w-full h-1/2 pb-2" alt="" width={50} height={50}></Image>
                        Recipe Name: Lechon 
                </div>
                <div className="rounded bg-[#363740] h-40 w-[200px]  shadow-sm"></div>
                <div className="rounded bg-[#363740] h-40 w-[200px]  shadow-sm"></div>
                <div className="rounded bg-[#363740] h-40 w-[200px]  shadow-sm"></div>
                <div className="rounded bg-[#363740] h-40 w-[200px]  shadow-sm"></div>
                
            </div>
            
        </>
      );
    }



export default HomePage