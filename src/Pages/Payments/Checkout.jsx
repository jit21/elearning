import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layout/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayments } from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";

function Checkout(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const razorpayKey=useSelector((state)=>state?.razorpay?.key);
    const subscription_id=useSelector((state)=>state?.razorpay?.subscription_id);
    const userData= useSelector((state)=>state?.auth?.data);
    const isPaymentVerified=useSelector((state)=>state?.razorpay?.isPaymeentVerified);
    const paymentDetails={
        razorpay_payment_id:"",
        razorpay_subscription_id:"",
        razorpay_signature:""
    }
    async function handleSubscription(e){
        e.preventDefault();
        if(!razorpayKey || !subscription_id){
            toast.error("Razorpay key or subscription ID is not available");
            return ;
        }
        const options={
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Coursify Pvt.Ltd",
            description: "Subscription",
            theme:{
                color:'#F37254'

            },
            prefill: {
                name: userData?.fullName,
                email: userData?.email
            },
            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                toast.success("Payment successful");
                const res= await dispatch(verifyUserPayments(paymentDetails));
                (res?.payload?.success) ? navigate('/checkout/success') : navigate('/checkout/fail');
            }
        }
        const paymentObject=new window.Razorpay(options);
        paymentObject.open();

    }
    async function load(){
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());

    }
    useEffect(()=>{
        load();

    },[])
    return(
        <HomeLayout>
           <form onSubmit={handleSubscription} className="min-h-[90vh] flex items-center justify-center text-white">

                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-sm"> Subscription Bundle</h1>
                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px] ">
                            This purchase will give you access to all the courses available on our platform for a period of 1 year.
                        </p>
                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee/> <span>499</span>only
                        </p>
                        <div className="text-gray-200">
                            <p>100% refund on cancellation within 7 days of purchase</p>
                            <p>* Terms and condition applied</p>
                        </div>
                        <button type="submit" className="bg-yellow-500 text-white font-bold text-lg px-6 py-3 rounded-md hover:bg-yellow-600 transition-all ease-in-out duration-300">
                            Buy Now
                        </button>

                    </div>

                </div>

           </form>

        </HomeLayout>
    )


}

export default Checkout;