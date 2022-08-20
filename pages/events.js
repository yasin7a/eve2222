import React from "react";
import Image from "next/image";
import Head from "next/head";
import ButtonLinkOrClick from "../components/reUseComponents/ButtonLinkOrClick";
import placeholder from "../utils/imageBlurLoader";
const Events = () => {
  return (
    <>
      <Head>
        <title>Eventizer | Events</title>
      </Head>

      <div className="container m-all min-h-screen  text-center">
        <div className=" max-w-[500px] mx-auto my-3">
          <Image
            src={
              "https://res.cloudinary.com/eventizer-store/image/upload/v1656948431/Eventizer_New_Site/404_image_xz7ypc.png"
            }
            layout="responsive"
            width={516}
            height={277}
            alt="construction image"
            placeholder="blur"
            blurDataURL={placeholder}
          />
        </div>

        <h1 className="font-22 sm:font-30 md:font-48 color3">
          This site is under construction
        </h1>
        <p className="font-14 sm:font-18 color4 mt-[14px]">
          We are currently building our website in order to provide you with the
          greatest user experience possible. Please bear with us for a few days.
          Register in as a pertner if you are a microentrepreneur. Thank you
          very much
        </p>

        <ButtonLinkOrClick
          isLink={true}
          text="Register Now"
          font="font-14 sm:font-16 md:font-22 font-normal "
          goto="/vendor-register"
          radius="rounded-[6px]"
          otherCss="inline-block mt-6"
          px="px-[50px]"
          py=" py-[8px] md:py-[10px]"
        />
      </div>
    </>
  );
};

export default Events;
