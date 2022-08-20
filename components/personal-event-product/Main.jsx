import React, { useState, useEffect } from "react";
import servicesList from "../../data/servicesList";
import Link from "next/link";
import services from "../../utils/services";
import { API, withSSRContext } from "aws-amplify";
import Image from "next/image";
import finger_icon from "../../public/img/finger_icon.svg";
import { customStyles, theme } from "../../data/reactSelectStyle";
import Option from "../reUseComponents/ReactSelectCheckBox";
import Select from "react-select";
import {
  optionsSpecializedInPhoto_Cinemato,
  optionsServiceLoction,
} from "../../utils/options";
import HamburgerDashboard from "../reUseComponents/icons/HamburgerDashboard";
import Items from "./Items";
import { useRouter } from "next/router";
import * as queries from "../../src/graphql/queries";
const Main = ({ service }) => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [serviceAPI, setserviceAPI] = useState(null);
  const [vData, setvData] = useState(null);
  const [datas, setdatas] = useState([]);
  const [serve, setserve] = useState(null);

  const [FilterData, setFilterData] = useState([]);

  async function check() {
    if (service === "Photography") {
      setserviceAPI(queries.listPhotographies);
      setvData("listPhotographies");
      setserve(services.photography);
    }
    if (service === "Cinematography") {
      setserviceAPI(queries.listCinematographies);
      setvData("listCinematographies");
      setserve(services.cinematography);
    }
    if (service === "Dj/Musician") {
      setserviceAPI(queries.listDJMusicians);
      setvData("listDJMusicians");
      setserve(services.djMusician);
    }
    if (service === "Mehedi Artist") {
      setserviceAPI(queries.listMehediArtists);
      setvData("listMehediArtists");
      setserve(services.mehediArtist);
    }
    if (service === "Makeup Artist") {
      setserviceAPI(queries.listMakeupArtists);
      setvData("listMakeupArtists");
      setserve(services.makeupArtist);
    }
  }
  const handleClickNav = () => {
    setToggle(!toggle);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);
  useEffect(() => {
    check();
  }, []);

  useEffect(() => {
    let filter = {
      or: [{ status: { eq: "Accepted" } }],
    };
    async function getdatas() {
      const res = await API.graphql({
        query: serviceAPI,
        authMode: "API_KEY",
        variables: { filter: filter },
      });

      const photographer = await res?.data[vData].items;
      setdatas(photographer);
    }
    if (serviceAPI !== null) {
      getdatas();
    }
  }, [serviceAPI, vData]);
  useEffect(() => {
    setFilterData([...datas]);
  }, [datas]);

  return (
    <>
      <div className="container m-all sm:pt-0 pt-12 product overflow-hidden-product  md:pb-0 pb-4">
        <h1 className="color4 font-18 sm:font-26">Personal event</h1>
        <p className="text-[#6F6F6F] font-14 ">
          Home {">"} Personal event {">"}{" "}
          <span className="capitalize">{service}</span>
        </p>

        <hr className="my-3" />

        <div className="flex h-min-screen relative">
          <div
            className={` w-[18%] min-w-[180px] absolute md:sticky left-0 md:left-[unset] bottom-0 md:bottom-[unset] top-0 md:bg-transparent  md:top-[12%] h-screen md:h-[30%] transition-transform duration-300 z-10 ${
              toggle ? "translate-x-0" : "translate-x-[-110%] md:translate-x-0"
            }`}
          >
            <button
              onClick={handleClickNav}
              className="absolute -right-8 top-[7px] bgcolor1 p-2 block md:hidden"
            >
              <HamburgerDashboard />
            </button>
            <ul className=" pl-3">
              {servicesList.slice(0, 5).map((item, i) => {
                return (
                  <li key={i} className="mt-1  ">
                    <Link href={item.path}>
                      <a
                        className={`text-[#434343] font-14 font-normal hover:opacity-75 flex items-center gap-2 px-2 py-1 
                    ${
                      router.pathname == item.path &&
                      "bg-[#ef0d5e] bg-opacity-10 border-[#ef0d5e] border-b-2"
                    }
                    
                    `}
                      >
                        <span>
                          <Image
                            src={finger_icon}
                            alt="icon"
                            width={13}
                            height={13}
                          />
                        </span>
                        <span>{item.name}</span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className={`w-full md:w-[80%] pl-0 md:pl-5 lg:pl-8  border-l-0 md:border-l border-slate-300 transition-transform duration-300 ${
              toggle ? "translate-x-[14rem]" : "translate-x-0"
            }`}
          >
            <div className="flex justify-between flex-col gap-5 sm:gap-0 sm:flex-row items-center mb-5 sm:mb-0">
              <div>
                <h1
                  className="color4 font-18 sm:font-20 md:font-22
               lg:font-32 font-normal pl-6 md:pl-0 capitalize"
                >
                  {service}
                </h1>
              </div>
              <div className="flex gap-4">
                <div>
                  <Select
                    styles={customStyles}
                    instanceId
                    isMulti={false}
                    options={optionsSpecializedInPhoto_Cinemato}
                    components={{
                      Option,
                    }}
                    theme={theme}
                    isSearchable={false}
                    placeholder={"Category"}
                    classNamePrefix="react-select"
                    onChange={(value) => {
                    //   if (value.value === "") {
                    //     setFilterData(datas);
                    //     return;
                    //   }
                    //   const filteredData = datas.filter((d) =>
                    //     d.serviceLocation.some(
                    //       (v) => JSON.parse(v).value === value.value
                    //     )
                    //   );
                    //   setFilterData(filteredData);
                    }}
                  />
                </div>
                <div>
                  <Select
                    styles={customStyles}
                    instanceId
                    isMulti={false}
                    options={optionsServiceLoction}
                    components={{
                      Option,
                    }}
                    theme={theme}
                    isSearchable={false}
                    placeholder={"City"}
                    classNamePrefix="react-select"
                    onChange={(value) => {
                      if (value.value === "") {
                        setFilterData(datas);
                        return;
                      }
                      const filteredData = datas.filter((d) =>
                        d.serviceLocation.some(
                          (v) => JSON.parse(v).value === value.value
                        )
                      );
                      setFilterData(filteredData);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ====================== */}
            <div className="grid  grid-cols-2 lg:grid-cols-3 gap-5 sm:mt-5 min-h-[18rem]">
              {FilterData?.map((e, i) => {
                return <Items data={e} key={i} service={serve} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
