import { useNavigate } from "react-router-dom";

function CourseCard({data}){
    const navigate=useNavigate();
    return (
        <div className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg bg-gray-800 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 overflow-hidden"
        onClick={() => navigate(`/courses/description`,{state:{...data}})}
        >
            <div className="overflow-hidden">
                <img src={data?.thumbnail?.secure_url} 
                 alt="course thumbnail" className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale-[1,2] transition-all ease-in-out duration-300" />
                 <div className="p-3 space-y-1 text-white">
                    <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
                        {data?.title}

                    </h2>
                    <p className="line-clamp-3 text-sm text-gray-300">
                        {data?.description}
                    </p>
                    <p className="font-semibold ">
                        <span className="text-yellow-500 font-bold">
                            Catagory :{" "}
                        </span>
                        {data?.category}
                    </p>
                    <p className="font-semibold ">
                        <span className="text-yellow-500 font-bold">
                            Total lectures : {" "}
                        </span>
                        {data?.numberOfLectures}
                    </p>
                    <p className="font-semibold ">
                        <span className="text-yellow-500 font-bold">
                            Instructor : {" "}
                        </span>
                        {data?.createdBy}
                    </p>

                 </div>


            </div>


        </div>
    )

}

export default CourseCard;