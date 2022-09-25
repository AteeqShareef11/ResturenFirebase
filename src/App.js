import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateItem from "./pages/CreateItem";
import LogIn from "./components/LogIn";
import SighnUp from "./components/SighnUp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./components/Header";
import { gettAllFoodItems } from "./utils/firebaseFunction";


function App() {
  const { token } = useSelector((s) => s.userReducer);
  const dispatch = useDispatch();



  const featchData = async () => {
   await gettAllFoodItems().then((data)=>{

     dispatch({
         type:"setFoodItems",
         payload:data
     })
   })
  }


  useEffect(() => {
     featchData();
  }, []);

  useEffect(() => {
    if (token) {
      const getData = () => {
        onAuthStateChanged(auth, (user) => {
          dispatch({
            type: "getUser",
            payload: user.reloadUserInfo,
          });
        });
      };
      getData();
    }
  }, [token]);
  return (
    <div>
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SighnUp />} />
          <Route path="/createitem" element={<CreateItem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
