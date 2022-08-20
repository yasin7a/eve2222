import React, { useState, useCallback, useEffect } from "react";
import placeholder from "../../utils/imageBlurLoader";
import Image from "next/image";
import ImageViewer from "react-simple-image-viewer";
import { Storage } from "aws-amplify";
import useMediaQuery from "../../utils/useMediaQuery";
import Packages from "./Packages";
import Overview from "./Overview";
import ScrollSpyNav from "./ScrollSpyNav";
import ProfileInfo from "./ProfileInfo";
import MainOrder from "../../components/orderRequest/Main"

const Main = ({data,service}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const isMobile = useMediaQuery("(min-width: 900px)");
  const [slideImg, setslideImg] = useState([])
  const [order, setorder] = useState([])
  const [vendorData, setvendorData] = useState([])
  const [boolOrder, setboolOrder] = useState(false)
  console.log(data)
  const openImageViewer = useCallback((i) => {
    setCurrentImage(i);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isViewerOpen);
  }, [isViewerOpen]);

  useEffect(() => {
    if(slideImg.length===0){
      data?.portfolioImage?.map(async (e) => {
            let signedURL = await Storage.get(e);
            let url = signedURL;
            const data = await fetch(url);
            if (data.ok) {
              
            //   var blob = new Blob([result], { type: "image/png" });
          setslideImg(prev => {
        return	[...prev, url] 
        });
    
            } else {
           return
            }
          });
      
    }
  }, [])
  
  return (
<>
  {boolOrder? <MainOrder vendor={vendorData} orderData={order} bool={setboolOrder} boolval={boolOrder} setorder={setorder} service={service}/>:<>
<div
  className={`wrap min-h-[70vh] bg-no-repeat bg-cover z-[10] relative mt-[5.5rem] py-10 pt-5 mdx:pt-10 flex flex-col justify-center profile-vendor-wrapper`}
>
  {isMobile && (
    <Image
      src={slideImg?.[0]||"https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"}
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      alt={"cover image"}
      quality={100}
      placeholder="blur"
      blurDataURL={placeholder}
    />
  )}

  <div className="container  profile-vendor z-[1] ">
    <div className="mdx:flex flex-wrap gap-5 lg:gap-14">
      <div className="mdx:w-[50%]  mb-8 mdx:mb-0">
        <ProfileInfo slideImg={slideImg} openImageViewer={openImageViewer} data={data}/>
      </div>
      <div className="mdx:w-[47%] lg:w-[44%]">
        <Packages data={data} bool={setboolOrder} boolval={boolOrder} setorder={setorder} setvendor={setvendorData}/>
      </div>
    </div>
  </div>
</div>

<ScrollSpyNav />
<Overview data={data} />

{isViewerOpen && (
  <ImageViewer
    src={slideImg}
    currentIndex={currentImage}
    onClose={closeImageViewer}
    disableScroll={true}
    backgroundStyle={{
      backgroundColor: "rgba(0,0,0,0.9)",
    }}
    closeOnClickOutside={true}
  />
)}
</>}
</>
  )
};

export default Main;
