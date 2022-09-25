import React, { useEffect, useState } from "react";
import { MdDeleteForever, MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import EmptyCart from "../img/emptyCart.svg";

const CartContainer = () => {
  const dispatch = useDispatch();
  const showCart = useSelector((s) => s.cartReducer);
  const { cartItems } = useSelector((s) => s.cartItemsReducer);
  const [qty, setQty] = useState(1);
  const [totalPrice,setTotalPrice] = useState()
  console.log(cartItems.length);

  const cartShow = () => {
    console.log(showCart, "cart");

    dispatch({
      type: "showCart",
      payload: false,
    });
  };

  const minusQty = (id) => {
    setQty(qty - 1);
    cartItems.map((item) => {
      if (item.id === id) {
        item.qty === 1 ? (item.qty = 1) : (item.qty -= 1);
      }
    });
  };
  const addQty = (id) => {
    setQty(qty + 1);

    cartItems.map((item) => {
      if (item.id === id) {
        item.qty += 1;
      }
    });
  };

   useEffect(() => {

    
      let total = cartItems.reduce((prev,item)=>{
        return prev + item.price * item.qty
    },0)
    setTotalPrice(total)
  


  


   }, [cartItems,totalPrice,qty]);


   const removeFromCart = (item) => {
    dispatch({
      type: "RemoveFromCart",
      payload: item,
    });
  };




  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 1, x: 200 }}
      className="fixed top-0 right-0 w-full h-[86vh] 
    md:w-340 bg-gradient-to-tr from-orange-400 to-orange-600 z-[101] drop-shadow-md flex flex-col"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.8 }} onClick={cartShow}>
          <MdOutlineKeyboardBackspace className="text-3xl text-white" />
        </motion.div>
        <motion.p
          whileTap={{ scale: 0.8 }}
          className="text-lg text-white font-semibold"
        >
          Cart
        </motion.p>
        <motion.p
          whileTap={{ scale: 0.8 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md
         cursor:pointer text-base text-textColor
         "
        
        >
          Clear <RiRefreshFill /> {""}
        </motion.p>
      </div>

      {cartItems?.length > 0 ? (
        <div className="w-full h-full rounded-t-[2rem] flex flex-col bg-cartBg">
          {/* ////////////////////Cart Items //////////////// */}

          <div
            className="w-full h-340 md:h-42
     gap-3 flex flex-col overflow-y-scroll scrollbar-none px-6 py-10"
          >
            {cartItems &&
              cartItems?.map((item) => (
                <div className="relative w-full px-2 rounded-lg flex items-center bg-cartItem gap-2">
                  <div className="w-20 h-20 max-w-[60px] ">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="rounded-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col  gap-2">
                    <p className="text-white text-lg font-semibold">
                      {item.title}
                    </p>
                    <p className="text-lg text-white font-semibold">
                      <span className="text-sm text-white">$</span>
                      {item.price*item.qty}
                    </p>


                    

                  </div>
             
                                 

             

                  <div className="flex gap-1 items-center ml-auto cursor-default">
                    <div
                      className="cursor-pointer"
                      onClick={() => minusQty(item.id)}
                    >
                      <BiMinus className="text-lg text-white font-semibold" />
                    </div>

                    <p className=" text-white font-semibold w-5 h-5 flex items-center justify-center bg-cartBg">
                      {item.qty}
                    </p>

                    <div
                      className="cursor-pointer"
                      onClick={() => addQty(item.id)}
                    >
                      <BiPlus className="text-lg text-white font-semibold" />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0">
                  <motion.div
                     onClick={() => removeFromCart(item)}
                   whileTap={{ scale: 0.75 }}
                   className="bg-red-600 cursor-pointer hover:shadow-md w-4 h-4 rounded-full flex items-center justify-center"
                 >
                 
                   <MdDeleteForever className=" text-white text-xs" />
                 </motion.div>
                  </div>
                </div>
              ))}
          </div>

          {/* ////////////////////Cart Total //////////////// */}
          <div
            className="w-full  flex flex-1 gap-2 flex-col items-center justify-evenly 
      rounded-t-[2rem] bg-cartTotal px-8 "
          >
            <div className="w-full flex items-center justify-between">
              <p className="text-lg text-gray-400">Sub Total</p>
              <p className="text-lg text-gray-400">${totalPrice}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-lg text-gray-400">Delivery</p>
              <p className="text-lg text-gray-400">$1</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-lg text-gray-400">Total</p>
              <p className="text-lg text-gray-400">${totalPrice+1}</p>
            </div>
            <div className="w-full  py-2 flex items-center justify-center">
              <button
                className="bg-gradient-to-tr from-orange-400 to-orange-600 p-3 
          text-white text-lg font-semibold flex items-center 
          justify-center rounded-3xl w-full"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="W-full h-full flex flex-col items-center justify-center gap-8">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold capitalize">
            Add some item to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
