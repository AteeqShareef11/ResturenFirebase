import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector } from "react-redux";
import HotDishes from "./HotDishes";
import RowContainer from "./RowContainer";

const Menu = () => {
  const { foodItems } = useSelector((s) => s.foodItemReducer);
  // console.log(foodItems, "foodItems");
  const [scrollValue, setScrollValue] = useState(0);


useEffect(() => {
  
}, [scrollValue]);

  return (
<>
<div className="w-full  px-12 bg-img">
      <div className="w-full flex items-center justify-between">
        <p
          className="text-2xl mt-6 text-white capitalize relative font-semibold
         before:absolute before:rounded-lg before:content before:w-32 before:bg-gradient-to-tr from-orange-400 to-orange-700
         before:h-1 before:-bottom-2 before:left-0 transition-all ease-in-out duration-100
        "
        >
          our fresh & healthy fruits
        </p>
        <div className="hidden md:flex items-center gap-3">
          <div
            onClick={() => setScrollValue(-600)}
            className="w-8 h-8 bg-orange-500 cursor-pointer hover:bg-orange-700 rounded-lg
                    flex items-center justify-center"
          >
            <MdChevronLeft className="text-2xl text-white" />
          </div>
          <div
            onClick={() => setScrollValue(600)}
            className="w-8 h-8 bg-orange-500 cursor-pointer hover:bg-orange-700 rounded-lg
                    flex items-center justify-center"
          >
            <MdChevronRight className="text-2xl text-white" />
          </div>
        </div>
      </div>

      <RowContainer
        scrollValue={scrollValue}
        flag={true}
        data={foodItems?.filter((n) => n.categorey === "fruits")}
      />
    </div>
    <HotDishes/>
</>
  );
};

export default Menu;
