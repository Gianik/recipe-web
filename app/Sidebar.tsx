'use client'

import { forwardRef } from "react";
import Link from "next/link";
import {  UserIcon,UsersIcon, CakeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation"
import {Cog8ToothIcon} from "@heroicons/react/24/solid";

const SideBar = forwardRef(({ showNav }:any, ref:any) => {
  // const router = useRouter();
  const user_id = JSON.parse(localStorage.getItem('user') || '').id
  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        RECIPE BLOG
      </div>

      <div className="flex flex-col divide-y">
        <Link href={`/${user_id}`}>
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
        <Link href="#">
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
              <p>Proile</p>
            </div>
          </div>
        </Link>
        <Link href="#">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}
          >
            <div className="mr-2">
              <Cog8ToothIcon className="h-4 w-4 mr-2" />
            </div>
            <div>
              <p>Logout</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;