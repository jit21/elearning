import HomeLayout from "../Layout/HomeLayout";
import aboutMainImage from"../Assets/Images/MainAboutUs.jpg";
import apj from"../Assets/Images/apj.jpeg";
import billgates from"../Assets/Images/billgates.jpeg";
import einstine from"../Assets/Images/einstine.jpeg";
import steave from "../Assets/Images/steave.png";

function AboutUs(){
    return(
       <HomeLayout>

        <div className="pl-20 pt-20 flex flex-col text-white">
            <div className="flex items-center gap-5 mx-10">
                <section className="w-1/2 space-y-10">
                <h1 className="text-5xl text-yellow-500 font-semibold">
                    Affordable and quality online courses for everyone.
                </h1>
                <p className="text-xl text-gray-200">
                    Welcome to our online learning platform! We are dedicated to providing high-quality, affordable courses that empower learners of all backgrounds and skill levels. Our mission is to make education accessible and engaging for everyone, regardless of their location or financial situation.
                </p>

                </section>
                <div className="w-1/2">
                    <img
                    id="test1"
                    style={{filter: "drop-shadow(0 0 10px rgba(0, 0, 0))"}}
                    src={aboutMainImage} alt="About Us" className="drop-shadow-2xl rounded-3xl" />

                </div>
            </div>
    <div className="carousel w-1/2 my-16 m-auto">
   <div id="slide1" className="carousel-item relative w-full">
    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
    <img
      src={apj}
      className="transform scale-x-[1.5] rounded-[100%] border-2 border-gray-400 h-[35%] " />
      <p className="text-center text-gray-200  font-semibold">
        "The best way to predict the future is to create it." 
      </p>
      <h3 className="text-2xl text-yellow-500 font-semibold">
         A.P.J Abdul Kalam
      </h3>
    <div className="absolute  left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full">
  <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
    <img
      src={einstine}
      className="w-[47%] rounded-[100%] border-2  border-gray-400 h-[35%] ml-[-50px]" />
    <p className="text-center text-gray-200  font-semibold">
        "Life is like riding a bicycle. To keep your balance, you must keep moving."
        </p>
        <h3 className="text-2xl text-yellow-500 font-semibold">
            Albert Einstein
        </h3>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
    </div>
  </div>
  <div id="slide3" className="carousel-item relative w-full">
  <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
    <img
      src={steave}
      className="transform scale-x-[1.5] rounded-[100%]  border-gray-400 h-[35%] " />
      <p className="text-center text-gray-200  font-semibold">
        "Your time is limited, so don't waste it living someone else's life."
        </p>
        <h3 className="text-2xl text-yellow-500 font-semibold">
            Steve Jobs
        </h3>
        
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
    </div>
  </div>
  <div id="slide4" className="carousel-item relative w-full">
  <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
    <img
      src={billgates}
      className="transform scale-x-[1.12] rounded-[100%] border-2 border-gray-400 h-[35%] " />
        <p className="text-center text-gray-200  font-semibold">
        "Your most unhappy customers are your greatest source of learning."
        </p>
        <h3 className="text-2xl text-yellow-500 font-semibold">
            Bill Gates
        </h3>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
    </div>
  </div>
</div>

        </div>
       </HomeLayout>  
            
    )
}


export default AboutUs;