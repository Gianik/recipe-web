//server side component

import {  PlusCircleIcon} from "@heroicons/react/24/solid";
import PocketBase from 'pocketbase';

import Link from "next/link";
import Dashboard from "../dashboard";
export const revalidate = 10; //time in seconds for the server side component to fetch the data again (to keep it updated)

async function getUsers() { // get data
  const pb = new PocketBase(process.env.PB_LINK);
  const data = await pb.collection('users').getFullList(30, {
  });

  return data;
}

export default async  function  AllUsers({ }: any){ // cam be async as it is a server side component
  const users = await getUsers();

    
      return (
          <div>
            <Dashboard children={undefined} />
              <div className="flex mt-2 text-center justify-center">
                  <h1 className="font-bold pl-10 text-3xl mt-2">All Users</h1>
                  <Link href='/addusers'><button className="bg-blue-800 text-white ml-3 mt-4  px-2 rounded-lg flex"> Add Users   <PlusCircleIcon className="w-6 h-6 pl-1 top-1/2 right-0 " /> </button></Link>
                </div>
              <div className="grid lg:grid-cols-4 gap-5 ml-[100px] m-[100px] mt-16 text-white">
                  {users.map((x,i) => {
                    return (
                      <Link href={`/user/${x.id}`}>
                        <div key={i} className="rounded flex flex-col bg-[#363740] h-40 w-[200px] text-white text-center shadow-sm justify-center object-center" >
                          <h2 className=" mt-[10px] capitalize text-center">Name: {x.name}</h2>
                          <h2 className=" mt-[10px] text-center">Email: {x.email}</h2>
                          <h2 className=" mt-[10px] capitalize text-center">Role: {x.role}</h2>
                        </div>
                      </Link>
                    );
                  })}
            </div>  
        </div>
      );
    }