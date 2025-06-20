import HomeLayout from "../../Layout/HomeLayout";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

function CheckoutSuccess(){

    return(
        <HomeLayout>

            <div className="min-h-[90vh] flex items-center justify-center text-white">
                <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg absolute">
                    <h1 className="bg-green-500 absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center"> 
                        Payment Successfull
                    </h1>
                    <div className="px-4 flex flex-col justify-center space-y-2 items-center ">
                        <div className="text-center space-y-2 "> 
                            <h2 className="text-lg font-semibold ">
                                Welcome to the pro bundle
                            </h2>
                            <p className="text-left ">
                                Now you can enjoy all the courses.
                            </p>

                        </div>
                        
                        <AiFillCheckCircle className="text-green-500 text-5xl "/>


                    </div>
                    <Link to="/" className="w-full bg-green-500 hover:bg-green-700 transition-all ease-in-out duration-300 absolute bottom-0 text-center py-3 rounded-bl-lg rounded-br-lg text-white font-bold">
                    <button>
                        Go to HomePage
                    </button>
                    </Link>
                </div>

            </div>
        </HomeLayout>
    )

}

export default CheckoutSuccess;