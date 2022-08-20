import React, { useState,useEffect } from "react";
import OrderForm from "./OrderForm";
import PackageDetails from "./PackageDetails";
import Close from "../reUseComponents/icons/Close";
import GoBack from "../reUseComponents/icons/GoBack";
import { useRouter } from "next/router";
import {Storage} from "aws-amplify"
const Main = ({vendor,bool,boolval,setorder,orderData,service}) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [passData, setPassData] = useState(false);
  const [Files, setFiles] = useState([])
  console.log(service)
  let handleSHowOrderFrom = (quality) => {
    
    let obj ={...orderData[quality],
    packageStandard:quality,
    vendorID : vendor?.id,
    vendorNumber: vendor?.phoneNumber,
    title: vendor?.title,
    vendorEmail:vendor?.email,
    packName:orderData?.packageName,
    service:service
    }
    setPassData(obj);
    setShowForm(true);
  };
function checkData(){
  if(orderData?.packageImage?.length!==0){
    orderData?.packageImage?.map(async (e) => {
          let signedURL = await Storage.get(e);
          let url = signedURL;
          const data = await fetch(url);
          if (data.ok) {

        setFiles(prev => {
      return	[...prev, url] 
      });
  
          } else {
            return
          }
        });    
  }
}
  useEffect(() => {
checkData()
  }, [])
  
  return (
    <>
      <div className="container m-all">
        {!showForm && (
          <>
            <button onClick={() => bool(false)} className="py-5">
              <GoBack />
            </button>
            <div>
              <h3 className="font-22 font-normal color3">{orderData?.packageName}</h3>
              <p className="color1 font-14">
              {orderData?.packageDetails}
              </p>
            </div>

            <>
              <div className=" overflow-hidden">
                <>
                  <div>
                    <div className="overflow-x-auto p-5 flex gap-3 bar-thin">
                      {Files?.map((item, i) => {
                        return (
                          <div key={i}>
                            <div className="w-[300px] inline-block">
                              <div className="w-full h-full">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={item}
                                  alt="package-images"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              </div>
            </>

            <div className="grid grid-cols-1 md:grid-cols-2 mdx:grid-cols-3 gap-8 mt-7">
              {/* ====================== */}
              <div>
                <PackageDetails
                  quality="basic"
                  packageValue={orderData}
                  handleClick={handleSHowOrderFrom}
                />
              </div>

              {/* ====================== */}
              <div>
                <PackageDetails
                  quality="standard"
                  packageValue={orderData}
                  handleClick={handleSHowOrderFrom}
                />
              </div>

              {/* ========================= */}
              <div>
                <PackageDetails
                  quality="premium"
                  packageValue={orderData}
                  handleClick={handleSHowOrderFrom}
                />
              </div>
            </div>
          </>
        )}

        {showForm && (
          <>
            <div className="max-w-[40rem] mx-auto bg-white rounded p-6 shadow-lg">
              <button
                onClick={() => setShowForm(false)}
                className="ml-auto block mb-5"
              >
                <Close />
              </button>
              <OrderForm passData={passData} setShowForm={setShowForm} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
