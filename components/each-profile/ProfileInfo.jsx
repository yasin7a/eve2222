import React from "react";
import ReactStars from "react-rating-stars-component";
import Slider from "react-slick";
import { useEffect ,useState} from "react";
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <svg
        className="profile-slider"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.589966 10.59L5.16997 6L0.589966 1.41L1.99997 0L7.99997 6L1.99997 12L0.589966 10.59Z" />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <svg
        className="profile-slider"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.41003 1.41L2.83003 6L7.41003 10.59L6.00003 12L3.38077e-05 6L6.00003 1.23266e-07L7.41003 1.41Z" />
      </svg>
    </div>
  );
}
const ProfileInfo = ({ slideImg, openImageViewer,data }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 639,
        settings: {
          dots: false,
          infinite: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log(data)
  let years =JSON.parse(data.yearsOfExperience)
  const [serviceLocation, setserviceLocation] = useState("")
  const [rating, setrating] = useState(0)
  const [specializedIn, setspecializedIn] = useState("")
  useEffect(() => {
    let s =""
    let c=""
    let k =data?.Reviews?.items.length
    let r=0
    const sum = data?.Reviews?.items?.reduce((accumulator, object) => {
      return accumulator + object.salary;
    }, 0);
    
    r =sum/k ||0
    setrating(r)
  

    
    data?.serviceLocation?.map((e)=>{
      let k =JSON.parse(e)
      if(s.length===0){
        s=k.label
      }
      else{
        s=s+","+k.label
      }

      setserviceLocation(s)
    })
    data?.specializedIn?.map((e)=>{
      let r =JSON.parse(e)
      if(c.length===0){
        c=r.label
      }
      else{
        c=c+","+r.label
      }

      setspecializedIn(c)
    })
  }, [])
  
  return (
    <>
      <h1 className="text-[#141414] mdx:text-white font-18 sm:font-32 font-medium">
      {data.title||""}
      </h1>
      <h4 className="test-profile-sm">{years?.value||"0"} experienced</h4>
      <h4 className="test-profile-sm">Based in {serviceLocation||""}</h4>
      <div className="flex items-center test-profile-sm">
        <div>
          <ReactStars
            classNames="mr-2"
            size={24}
            edit={false}
            color={"#adb5bd"}
            activeColor={"#ef0d5e"}
            isHalf={true}
            value={rating}
          />
        </div>
        <div>
          <span>{rating}</span>
          <span>({data?.Reviews?.length||0} ratings)</span>
        </div>
      </div>
{data?.specializedIn?       <p className="test-profile-sm">
        Specialized in {specializedIn}
      </p>: <p></p>
      
      }
      <div className="mdx:max-w-[35rem] flex-1 mt-5">
        <Slider {...settings}>
          {slideImg.map((item, i) => {
            return (
              <div key={i} onClick={() => openImageViewer(i)}>
                <div className="mx-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item}
                    // layout="fill"
                    // objectFit="cover"
                    // objectPosition="center"
                    alt={"profile-image"}
                    // quality={100}
                    // placeholder="blur"
                    // blurDataURL={placeholder}
                    className="mx-auto block"
                  />
                </div>
              </div>
            );
          })}
        </Slider>

        <button
          className="test-profile-sm ml-auto block btn-hover"
          onClick={() => openImageViewer(0)}
        >
          Show All
        </button>
      </div>
    </>
  );
};

export default ProfileInfo;
