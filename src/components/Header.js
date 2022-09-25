import React, { useState } from "react";
import Logo from "../img/logo.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from "../img/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const user = useSelector((s) => s.userReducer);
  const {showCart} = useSelector((s) => s.cartReducer);
  const {cartItems} = useSelector((s) => s.cartItemsReducer);
  console.log(showCart);

  console.log("user", user.user?.photoUrl);

  const dispatch = useDispatch();
  const [isMenu, setIsMenu] = useState(false);

  const logout = () => {
    setIsMenu(false);
    localStorage.removeItem("token");
    dispatch({
      type: "logout",
    });
  };

  const cartShow = () => {
    dispatch({
      type: "showCart",
      payload: true,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-1 px-4 bg-primary  md:p-3 md:px-16">
      <div className="hidden  w-full h-full md:flex items-center  justify-between ">
        <Link to="/">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="flex items-center cursor-pointer space-x-3"
          >
            <img className="w-12 h-12 " src={Logo} alt="" />
            <p className="font-semibold text-3xl text-headingColor">City</p>
          </motion.div>
        </Link>

        <div className="flex space-x-12 items-center">
          <div>
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex space-x-10 text-headingColor cursor-pointer"
            >
              <li><a href="#">Home</a></li>
              <li><a href="#hotdishes">Hot Dishes</a></li>
              <li><a href="#aboutus">About us</a></li>
              <li><a href="#services">Services</a></li>
            </motion.ul>
          </div>
          <div className="flex justify-between space-x-5 items-center">
            <div className="cursor-pointer" onClick={cartShow}>
              <MdShoppingBasket className="text-3xl relative" />
              {cartItems && cartItems?.length > 0 && (
                <div
                  className="bg-red-600 rounded-full 
        w-5 h-5 flex items-center
         justify-center text-white absolute top-5 right-28"
                >
                  {cartItems.length}
                </div>
              )}
            </div>

            <Link to={user.user ? "/" : "/login"}>
              <div className="relative" onClick={() => setIsMenu(!isMenu)}>
                {/* {console.log(user.user?.photoUrl,"ph")} */}
                <motion.img
                  whileTap={{ scale: 0.6 }}
                  className="w-10 h-10 cursor-pointer rounded-full"
                  src={user.user? user.user?.photoUrl : Avatar}
                  alt=""
                />

                {isMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="absolute w-40 bg-gray bg-white flex flex-col top-12 right-0 shadow-lg"
                  >
                    {user && user.user?.email === "ateeqshareef11@gmail.com" && (
                      <Link to="createitem">
                        <p
                          onClick={() => setIsMenu(false)}
                          className="flex items-center p-2 px-4 gap-3 text-textColor text-base"
                        >
                          Create Item <MdAdd />
                        </p>
                      </Link>
                    )}

                    <p
                      onClick={logout}
                      className="flex items-center justify-center p-2 px-4 gap-3 cursor-pointer text-textColor text-base"
                    >
                      Logout <MdLogout />
                    </p>
                  </motion.div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex md:hidden items-center  justify-between ">
        <div onClick={cartShow} className="cursor-pointer">
          <MdShoppingBasket className="text-3xl relative" />
          {cartItems && cartItems?.length > 0 && (
            <div
              className="bg-red-600 rounded-full 
        w-5 h-5 flex items-center
         justify-center text-white absolute top-2 left-4"
            >
              {cartItems.length}
            </div>
          )}
        </div>
        <div className="flex items-center cursor-pointer space-x-3">
          <img className="w-10 h-10 " src={Logo} alt="" />
          <p className="font-semibold text-3xl text-headingColor">City</p>
        </div>
        <Link to={user.user ? "/" : "/login"}>
          <div className="relative" onClick={() => setIsMenu(!isMenu)}>
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 h-10 cursor-pointer rounded-full"
              src={user.user ? user.user?.photoUrl : Avatar}
              alt=""
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute w-40 bg-gray flex flex-col top-12 right-0 shadow-lg"
              >
                {user && user.user?.email === "ateeqshareef11@gmail.com" && (
                  <Link to="createitem">
                    <p
                      onClick={() => setIsMenu(false)}
                      className="flex items-center p-2 px-4 gap-3 text-textColor text-base"
                    >
                      Create Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  onClick={logout}
                  className="flex items-center justify-center p-2 px-4 gap-3 cursor-pointer text-textColor text-base"
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
