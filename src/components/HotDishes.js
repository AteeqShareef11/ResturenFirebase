import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Category } from "../utils/data";
import RowContainer from "./RowContainer";
import { motion } from "framer-motion";
import CartContainer from "./CartContainer";

const HotDishes = () => {
  const [filter, setFilter] = useState("chicken");

  const { foodItems } = useSelector((s) => s.foodItemReducer);
  const {showCart} = useSelector((s)=>s.cartReducer);

  console.log(showCart,"hot")


  useEffect(() => {
    
  }, [showCart]);

  return (
    <div className="w-full  px-12  " id="hotdishes">
      <div className="flex flex-col items-center justify-center">
        <p
          className="text-2xl text-headingColor mt-5 capitalize relative font-semibold
         before:absolute before:rounded-lg before:content before:w-12 before:bg-gradient-to-tr from-orange-400 to-orange-700
         before:h-1 before:-bottom-2 before:left-0 transition-all ease-in-out duration-100 mr-auto
        "
        >
          our hot dishes
        </p>

        <div
          className="w-full flex items-center justify-start
         lg:justify-center gap-8 mt-[60px] overflow-x-scroll scrollbar-none"
        >
          {Category &&
            Category.map((item) => (
              <motion.div
                whileTap={{ scale: 0.7 }}
                className={`group ${
                  filter === item.urlParamName ? "bg-red-600" : "bg-card"
                } rounded-lg w-24 min-w-[94px] 
            h-28 cursor-pointer gap-3 flex flex-col
             items-center justify-center hover:bg-red-600 `}
                onClick={() => setFilter(item.urlParamName)}
              >
                <div
                  className={`w-10 h-10 ${
                    filter === item.urlParamName ? "bg-card" : "bg-red-600"
                  } rounded-full flex items-center justify-center group-hover:bg-card`}
                >
                  <IoFastFood
                    className={`${
                      filter === item.urlParamName
                        ? "text-headingColor"
                        : "text-white"
                    } group-hover:text-headingColor`}
                  ></IoFastFood>
                </div>
                <p
                  className={`text-base ${
                    filter === item.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } capitalize group-hover:text-white`}
                >
                  {item.urlParamName}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.categorey === filter)}
          />
        </div>
    
      {
        showCart ? (
            <CartContainer/>
        ) : <></>
      }
      
       
      </div>
    </div>
  );
};

export default HotDishes;
