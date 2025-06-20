import { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseLectures } from "../../Redux/Slices/LectureSlice";
import { deleteCourseLectures } from "../../Redux/Slices/LectureSlice";

function Displaylectures(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {state}=useLocation();
    const {lectures}=useSelector((state)=>state.lecture);
    const {role}=useSelector((state)=>state.auth);
    const [currentVideo, setCurrentVideo]=useState(0);
    async function onLectureDelete(courseId, lectureId){
        console.log("course id->",courseId);
        console.log("lecture id->",lectureId);
        await dispatch(deleteCourseLectures({courseId:courseId, lectureId:lectureId}));
        await dispatch(getCourseLectures(courseId));

    }
    useEffect(()=>{
        console.log(state);
        if(!state){
            navigate("/courses");
        }
        dispatch(getCourseLectures(state._id));

    },[])
    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
                <div className="text-center text-2xl font-semibold text-yellow-500" >
                    Course Name: {state?.title}

                </div>
                <div className="flex justify-center gap-10 w-full">
                    {lectures && lectures.length>0 && <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        {/* {console.log(lectures[0]?.lecture[0]?.secure_url)} */}
                    <video src={lectures && lectures[currentVideo]?.lecture[0]?.secure_url}
                     className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                     controls
                     disablePictureInPicture
                     controlsList="nodownload"
                    >

                    </video>
                    <div>
                        <h1>
                            <span className="text-yellow-500"> Title:{" "}
                            </span>
                                {lectures && lectures[currentVideo]?.title}
                            
                        </h1>
                        <p>
                           <span className="text-yellow-500 line-clamp-4">
                            Description:{" "}
                           </span>
                           {lectures && lectures[currentVideo]?.description}
                        </p>
                    </div>
                    </div>}
                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                        <li className="text-xl font-semibold text-yellow-500 flex items-center justify-between">
                            <p>
                                Lecture list
                            </p>
                            {role==="ADMIN" && (
                                <button className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition-all ease-in-out duration-300"
                                 onClick={()=>navigate("/course/addlecture",{state:{...state}})}>
                                    Add new Lecture
                                </button>
                            )}
                        </li>
                        {
                            lectures && lectures.map((lecture, idx)=>{

                                return (
                                    <li key={lecture._id} className="space-y-2">
                                        <p className="cursor-pointer " onClick={()=>setCurrentVideo(idx)}>
                                            <span>
                                                {" "} Lecture {idx+1} :{" "}
                                            </span>
                                            {
                                                lecture.title
                                            }


                                        </p>
                                         {role==="ADMIN" && (
                                <button className=" btn btn-accent text-sm px-2 py-1 rounded-md font-semibold" 
                                onClick={()=>onLectureDelete(state._id, lecture._id)}
                                >
                                    Delete Lecture
                                </button>
                            )}

                                    </li>
                                )
                            }

                            )
                        }
                    </ul>

                </div>

            </div>


        </HomeLayout>
    )

}

export default Displaylectures;