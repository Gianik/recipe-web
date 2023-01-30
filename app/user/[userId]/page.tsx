// server side component

import { PencilSquareIcon,TrashIcon} from "@heroicons/react/24/solid";
import PocketBase from 'pocketbase';
import Link from "next/link";
import Dashboard from "../../dashboard";
export const revalidate = 10; //time in seconds for the server side component to fetch the data again (to keep it updated)

async function getUser(userId: string) {// fetch the data
    const pb = new PocketBase(process.env.PB_LINK);;
    const data = await pb.collection('users').getOne(`${userId}`);

    return data;
}

export default async  function  UserPage({ params }: any){ // can be async as it is a server side component
    const user = await getUser(params.userId);

    
    return (
            <>
                <Dashboard children={undefined} />
                <div className="flex mt-2 text-center justify-center">
                    <h2 className="font-bold pl-1 text-3xl mt-2">My Recipes</h2>
                    <Link href={`/editusers/${user.id}`}><button className="bg-yellow-500 text-white ml-3 mt-4  px-2 rounded-lg flex"> Edit User   <PencilSquareIcon className="w-6 h-6 pl-1 top-1/2 right-0 " /> </button></Link>
                    <Link href={`/deleteuser/${user.id}`}><button className="bg-red-500 text-white ml-3 mt-4  px-2 rounded-lg flex"> Delete User   <TrashIcon className="w-6 h-6 pl-1 top-1/2 right-0 " /> </button></Link>
                </div>
                <div className="flex  flex-grow items-center text-center justify-center gap-5 ml-[100px] m-[100px] mt-16 text-white">
                    <div  className="rounded-xl flex  flex-col grid-cols-1   bg-[#363740]  w-[500px] text-white shadow-sm  " >
                        <h2 className=" mt-[0px] capitalize text-center">Name: {user.name}</h2>
                        
                        <hr className="w-full mt-1" />
                        <h2 className=" mt-[0px] text-center">Email: {user.email}</h2>
                        <hr className="w-full mt-1" />
                        <h2 className=" mt-[0px] capitalize text-center">Role: {user.role}</h2>
                    </div>
                </div>
            </>
      );
    }