import React from "react";
import Delivery from "../img/delivery.png";

import Hero1 from "../img/cu4.png";
import Hero2 from "../img/cu3.png";
import Hero3 from "../img/cu2.png";
import Slider from "react-slick";


const Hero = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full px-10 bg-gradient-to-r from-cyan-500 to-orange-500 "
      id="/"
    >
      <div className="py-2 px-5 mt-[110px] flex flex-col flex-1 items-start justify-center gap-4">
        <div className="flex items-center justify-center gap-2 bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain "
              alt=""
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in {""}{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[4.5rem]">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 px-4 py-2 rounded-lg w-full hover:shadow-lg transition-all ease-in-out duration-100 md:w-auto"
        >
          Order Now
        </button>
      </div>
      <div className="mt-32 ">
      <Slider {...settings}>
      <div>
          <img width="100%" src={Hero1} alt="" />
        </div>
        <div>
          <img width="100%" src={Hero2} alt="" />
        </div>
        <div>
          <img width="100%" src={Hero3} alt="" />
        </div>
        </Slider>


        {/* <div className="flex items-center justify-center absolute w-full h-full top-0 left-0 gap-4 flex-wrap md:pr-4  md:px-30 pt:2 lg:pt-10 ">
          {dataHero &&
            dataHero.map((n) => (
              <div
                key={n.id}
                className="bg-cardOverlay  lg:w-170  p-4 flex flex-col rounded-2xl items-center justify-center backdrop:blur-md shadow-2xl"
              >
                <img src={n.imgSrc} className="lg:w-40 w-20 -mt-10 lg:-mt-20" alt="" />
                <p className=" font-semibold text-textColor text-md mt-1">
                  {n.name}
                </p>
                <p className="text-xs text-lightTextGray font-semibold my-2 lg:my-4">
                  {n.desc}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-sm text-red-600">$</span>
                  {n.price}
                </p>
              </div>
            ))}
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
