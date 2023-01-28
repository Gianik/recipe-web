import Sidebar from "./Sidebar"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function HomePage() {

    return (
        
        <div className="flex" >
            
            <Sidebar />
            <h1 className="text-green-500 text font-bold"></h1>
            <ToastContainer />
      </div>
  )
}


export default HomePage