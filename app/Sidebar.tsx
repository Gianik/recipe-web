'use client'

import { forwardRef,useEffect,useState } from "react";
import Link from "next/link";
import {  UserIcon,UsersIcon, CakeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation"
import {Cog8ToothIcon} from "@heroicons/react/24/solid";
import { toastSuccess } from '../components/toast';
import 'react-toastify/dist/ReactToastify.css';
const SideBar = forwardRef(({ showNav }:any, ref:any) => {
  const router = useRouter();
  const [userId, setUserId] = useState("")
  const [role, setRole] = useState("")
  

  useEffect(() => {
    const user = localStorage.getItem('user') || ''
      if (user == "") {
          router.push('/login')
      }
      fetchData()
  }, []);

  const fetchData = async () => {
      setUserId(JSON.parse(localStorage.getItem('user') || '').id);
      setRole(JSON.parse(localStorage.getItem('user') || '').role);
  }

  const handleLogout = (e: any) => {
    
    toastSuccess("You have Logged Out")
    localStorage.removeItem('user')
    location.replace("/login")
    

  }
  

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <Link href={`/${userId}`} >RECIPE BLOG</Link>
      </div>
      {role == 'admin' ? (
          <div className="flex flex-col divide-y">
          <Link href='/adminrecipes'>
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}
            >
              <div className="mr-2">
                <CakeIcon className="h-5 w-5" />
              </div>
              <div>
                <p>Recipes</p>
              </div>
            </div>
          </Link>
          <Link href="/adminusers">
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors `}
            >
              <div className="mr-2">
                <UsersIcon className="h-5 w-5" />
              </div>
              <div>
                <p>Users</p>
              </div>
            </div>
          </Link>
          <Link href="/profile">
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}
            >
              <div className="mr-2">
                <UserIcon className="h-5 w-5" />
              </div>
              <div>
                <p>Profile</p>
              </div>
            </div>
          </Link>
            <div onClick={handleLogout}
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}
            >
              <div className="mr-2">
              <button  ><Cog8ToothIcon className="h-4 w-4 mr-2" /></button>
              </div>
              <div>
                <p>Logout</p>
              </div>
            </div>
        </div>      
 
      ) : (
        <div className="flex flex-col divide-y">
        <Link href="/profile">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}
          >
            <div className="mr-2">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Profile</p>
            </div>
          </div>
        </Link>
          <div onClick={handleLogout}
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}
          >
            <div className="mr-2">
              <Cog8ToothIcon className="h-4 w-4 mr-2" />
            </div>
            <div>
              <p>Logout</p>
            </div>
          </div>

      </div>                
          
        )}

    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;