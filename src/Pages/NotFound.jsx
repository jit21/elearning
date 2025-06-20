import { useNavigate } from "react-router-dom";
function NotFound() {
    const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
         <h1 className="text-9xl font-bold mb-4 text-yellow-500">
            404
         </h1>
         <div className="text-2xl font-semibold mb-4">
            Page Not Found
         </div>
         <button className="mt-5">
            <a className="relative inline-block text-lg font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none " >
                <span onClick={()=>navigate(-1)} className="realative block px-8 py-3 bg-[#1F1F2] border border-current">
                    Go Back
                </span>
            </a>
            
         </button>

    </div>

  )};


  export default NotFound;