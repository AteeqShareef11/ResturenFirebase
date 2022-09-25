import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket, MdDeleteForever } from "react-icons/md";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const RowContainer = ({ data, flag, scrollValue }) => {
  const { cartItems } = useSelector((s) => s.cartItemsReducer);
  console.log(cartItems);

  const dispatch = useDispatch();
  // const [isItem, setIsItem] = useState(true);

  const rowContainer = useRef();

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  const addToCart = (item) => {
    dispatch({
      type: "setCartItems",
      payload: item,
    });
  };

  const removeFromCart = (item) => {
    dispatch({
      type: "RemoveFromCart",
      payload: item,
    });
  };

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center  gap-3 py-12   scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex flex-wrap justify-center bg-img2 p-10 mt-10 rounded-3xl"
      }`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item.id}
            className="w-275 min-w-[275] md:w-300 md:min-w-[300] bg-gray-50 rounded-2xl
          hover:drop-shadow-xl p-3 h-[195px] my-12 backdrop-blur-lg flex flex-col items-center justify-center "
          >
            <div className="w-full flex items-center justify-between ">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
              >
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <div className="w-full flex flex-col items-end  justify-end">
                <p className="md:text-lg text-base text-textColor font-semibold">
                  {item.title}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {item.calories} Calories
                </p>
                <div className="flex items-center gap-8">
                  <p className="text-lg font-semibold my-1 text-headingColor">
                    <span className="text-sm text-red-600">$</span>
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
            {cartItems?.find((val) => val.id === item.id) ? (
              <>
                <div className="flex items-center justify-between w-full">
                  <motion.p className="text-base font-semibold text-red-600 cursor-pointer"
                   whileTap={{ scale: 0.75 }}
                   onClick={() => removeFromCart(item)}
                   >
                    Remove From Cart
                  </motion.p>
                  <motion.div
                    onClick={() => removeFromCart(item)}
                    whileTap={{ scale: 0.75 }}
                    className="bg-red-600 cursor-pointer hover:shadow-md w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <MdDeleteForever className=" text-white" />
                  </motion.div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between w-full">
                  <motion.p className="text-base font-semibold text-red-600 cursor-pointer"
                    whileTap={{ scale: 0.75 }}
                    onClick={() => addToCart(item)}
                  >
                    Add To Cart
                  </motion.p>
                  <motion.div
                    onClick={() => addToCart(item)}
                    whileTap={{ scale: 0.75 }}
                    className="bg-red-600 cursor-pointer hover:shadow-md w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <MdShoppingBasket className=" text-white" />
                  </motion.div>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default RowContainer;
