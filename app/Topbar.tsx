'use client'

import { Fragment,useState,useEffect } from "react";
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition, Popover } from "@headlessui/react";
import {  toastSuccess } from '../components/toast';
import { useRouter } from "next/navigation"
export default function TopBar({ showNav, setShowNav }: any) {
    const router = useRouter();
    const [name,setName] = useState("")


  useEffect(() => {
    const user = localStorage.getItem('user') || ''
    if (user == "") {
      router.push('/login')
    }
        fetchData()
    }, [])
    const fetchData = async () => {//fetch the data from local storage since it is already there
      setName(JSON.parse(localStorage.getItem('user') || '').name);

  }
  const handleLogout = (e: any) => {

    toastSuccess("You have Logged Out")
    localStorage.removeItem('user')
    location.replace("/login")
   
    

  }
  
  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] bg-white ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <span className="hidden md:block font-medium text-gray-700">
                {name ? name : 'User'}
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <button type="submit" className="w-full" onClick={handleLogout}>
                  <div 
                    className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <Cog8ToothIcon className="h-4 w-4 mr-2" />
                    Logout
                    </div>
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}