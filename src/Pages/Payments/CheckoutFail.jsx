//create payment fail similar way of checkout success
import HomeLayout from "../../Layout/HomeLayout";

import { Link } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx"; // If available


function CheckoutFailure(){

    return(
        <HomeLayout>

            <div className="min-h-[90vh] flex items-center justify-center text-white">
                <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg absolute">
                    <h1 className="bg-red-500 absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center"> 
                        Payment Failed
                    </h1>
                    <div className="px-4 flex flex-col justify-center space-y-2 items-center ">
                        <div className="text-center space-y-2 "> 
                            <h2 className="text-lg font-semibold ">
                                Oops! Your payment failed
                            </h2>
                            <p className="text-left ">
                                Please try again or contact support if the issue persists.
                            </p>

                        </div>
                        
                        <RxCrossCircled className="text-red-500 text-5xl "/>


                    </div>
                    <Link to="/checkout" className="w-full bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 absolute bottom-0 text-center py-3 rounded-bl-lg rounded-br-lg text-white font-bold">
                    <button>
                        Try again
                    </button>
                    </Link>
                </div>

            </div>
        </HomeLayout>
    )

}

export default CheckoutFailure;

