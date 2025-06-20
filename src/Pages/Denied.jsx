import { useNavigate } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";

function Denied(){
    const navigate = useNavigate();
    return(
        <HomeLayout>
        <main className="min-h-[90vh] pt-12 pl-20 flex flex-col justify-center items-center gap-10 text-white bg-gray-900">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                403
            </h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
                Access Denied
            </div>
            <button onClick={()=>navigate(-1)}className="mt-5">
                <span className="relative block px-8 py-3 font-bold text-yellow-500 border border-yellow-500 rounded group active:text-yellow-500 active:bg-white hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring transition-all duration-300 ease-in-out">
                Go Back
                </span>
            </button>

        </main>
        </HomeLayout>
    )
}

export default Denied;