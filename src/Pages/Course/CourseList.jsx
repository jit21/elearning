import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layout/HomeLayout";
import CourseCard from "../../Components/CourseCard";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);
   async function loadCourses() {
       await dispatch(getAllCourses());
    }
    useEffect(() => {
        loadCourses();
    },[]);

  return (
    <HomeLayout>

        <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white ">
            <h1 className="text-3xl font-semibold text-center">
                Explore the courses made by {" "}
                <span className="text-2xl font-bold text-yellow-400">
                    Industry Experts
                </span>
            </h1>   
                <div className="mb-10 flex flex-wrap gap-14">
                    {courseData?.map((element)=>{
                        return<CourseCard key={element._id} data={element}/>
                    })}


                </div>
            

        </div>
    </HomeLayout>
    
    );
}

export default CourseList;