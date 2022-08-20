import React, { useState } from "react";
import BankTransfer from "./BankTransfer";
import MobileBanking from "./MobileBanking";
import {useEffect } from "react";
import * as queries from "../../../src/graphql/queries";
import { useUserOrVendor } from "../../../authContext/AuthContext";
import {Auth ,API} from 'aws-amplify'
const Main = () => {
  let { dispatch } = useUserOrVendor();
	const storage = JSON.parse(localStorage.getItem("AmpUserInfo"));
  async function getData(){
    const user = await Auth.currentAuthenticatedUser();
    let service=user.attributes["custom:service"]
    let id =user.attributes.sub
    let serviceAPI = null;
    let vData =null

    if ((service === "photography")) {
      serviceAPI = queries.getPhotography;
      vData="getPhotography"
    }
    if ((service === "cinematography")) {
      serviceAPI = queries.getCinematography;
      vData="getCinematography"
    }
    if ((service === "dj-musician")) {
      serviceAPI = queries.getDJMusician;
      vData="getDJMusician"
    }
    if ((service === "mehedi-artist")) {
      serviceAPI = queries.getMehediArtist;
      vData="getMehediArtist"
    }
    if ((service === "makeup-artist")) {
      serviceAPI = queries.getMakeupArtist;
      vData="getMakeupArtist"
    }
    const vendor = await API.graphql({
      query: queries.getVendor,
      variables: { id: id }
    });
    const vendorDetails = await API.graphql({
      query: serviceAPI,
      variables: { id: id }
    });
    const balance = await API.graphql({
      query: queries.getBalance,
      variables: { id: id }
    });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload:{
          vendorDetails: vendor?.data?.getVendor,
          vendor: vendorDetails?.data[vData],
          balance: balance?.data?.getBalance,
          data:"Found",
          profilePicture:vendorDetails?.data[vData]?.uploadYourPhoto
      },
      })
  }
  useEffect(() => {
getData()
  }, [])
  let vbalance =storage.balance
  let [MBisOpen, setMBisOpen] = useState(false);
  let [BTisOpen, setBTisOpen] = useState(false);
  return (
    <>
      <h3 className="font-22 md:font-26 font-normal color4 ">Earnings</h3>
      <div className="md:flex gap-x-10 mt-5">
        <div className=" grid grid-cols-3  bg-white grow py-5 sm:p-8 items-center text-center md:w-[70%]">
          <div className="py-2 sm:py-5">
            <h4 className="font-14 sm:font-16 color4 font-normal">Total Income</h4>
            <p className="font-18 sm:font-26 color3 font-normal mt-2">৳{vbalance.withdrawAmount+vbalance.balance}</p>
          </div>{" "}
          <div className="border-x-2 border-slate-300 py-2 sm:py-5">
            <h4 className="font-14 sm:font-16 color4 font-normal">Total Withdraw</h4>
            <p className="font-18 sm:font-26 color3 font-normal mt-2">৳{vbalance.withdrawAmount}</p>
          </div>{" "}
          <div className="py-2 sm:py-5">
            <h4 className="font-14 sm:font-16 color4 font-normal">Balance</h4>
            <p className="font-18 sm:font-26 color3 font-normal mt-2">৳{vbalance.balance}</p>
          </div>
        </div>
        <div className="md:w-[30%] md:mt-0 mt-5">
          <h3 className="font-18 md:font-24 font-normal color4 mb-3 sm:mb-5">
            Withdraw
          </h3>
          <button
            onClick={() => setMBisOpen(true)}
            className="px-3 py-2 bg-white border border-slate-600 rounded color4 font-16  block w-full mb-3 sm:mb-5 btn-hover"
          >
            Mobile Banking
          </button>
          <button
            onClick={() => setBTisOpen(true)}
            className="px-3 py-2 bg-white border border-slate-600 rounded color4 font-16   block w-full btn-hover"
          >
            Bank Transfer
          </button>
        </div>
      </div>

      {MBisOpen && (
        <div className="modal-cover flex-center overflow-auto">
          <div className="max-w-[800px] mx-auto ">
            <MobileBanking setMBisOpen={setMBisOpen} />
          </div>
        </div>
      )}

      {BTisOpen && (
        <div className="modal-cover flex-center overflow-auto ">
          <div className="max-w-[800px] mx-auto">
            <BankTransfer setBTisOpen={setBTisOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
