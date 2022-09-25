import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";
import { storage } from "../firebase";
import { Category } from "../utils/data";
import {motion} from "framer-motion"
import Loader from "../components/Loader";
import { gettAllFoodItems, saveItem } from "../utils/firebaseFunction";
import { useDispatch } from 'react-redux';




const CreateItem = () => {
  const initialData = {
    title: "",
    categorey: "",
    calories: "",
    price: "",
  };


  const dispatch = useDispatch();

  const [itemData, setItemData] = useState(initialData);
  const [imageAsset, setImageAsset] = useState(null);
  const [field,setField] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [msg,setMsg]=useState("")
  const [alertMsg,setAlertMsg]=useState("danger")

  const uploadImage = (e) => {
    setIsLoading(true)
    const imageFile = e.target.files[0];
    const storgeRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
    const uploadTask =uploadBytesResumable(storgeRef, imageFile);
      
    uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:

    }
  }, 
  (error) => {
   setField(true)
   setMsg("Error While Uploading : Try Again") 
   setAlertMsg("danger")
   setTimeout(() => {
        setField(false)
        setIsLoading(false)
   }, 4000);
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setImageAsset(downloadURL);
      setIsLoading(false)
      setField(true)
      setMsg("Your image is uploded successfully")
      setAlertMsg("success")
      setTimeout(() => {
        setField(false)
      }, 4000);
    });
  }
);


  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const deletImage = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset)
    deleteObject(deleteRef).then(()=>{
      setImageAsset(null)
      setIsLoading(false)
      setField(true)
      setMsg("Your image is deleted successfully")
      setAlertMsg("success")
      setTimeout(() => {
        setField(false)
      }, 4000);

    })
  };

  const saveDetails = () => {
   setIsLoading(true)
   try {
    if((!itemData.title || !itemData.categorey || !itemData.calories || !itemData.price || !imageAsset)){
      setField(true)
      setMsg("Required Fields cant be empty")
      setAlertMsg("danger")
      setTimeout(() => {
        setField(false)
        setIsLoading(false)
      }, 4000);

    } else {
      const data = {
         id: `${Date.now()}`,
         title: itemData.title,
         categorey:itemData.categorey,
         calories:itemData.calories,
         price:itemData.price,
         qty:1,
         imageUrl:imageAsset
      }
      saveItem(data)
      setIsLoading(false)
      setItemData(initialData)
      setImageAsset(null)
      setField(true)
      setMsg("Your data is uploaded succussfully")
      setAlertMsg("success")
      setTimeout(() => {
        setField(false)
      }, 4000);

     
    }

   } catch (error) {
    setField(true)
    setMsg("Error While Uploading Data : Try Again") 
    setAlertMsg("danger")
    setTimeout(() => {
         setField(false)
         setIsLoading(false)
    }, 4000);
   }

   featchFoodItems();
  }


  const featchFoodItems = async () => {
    await gettAllFoodItems().then((data)=>{
      console.log(data,"data")
      dispatch({
          type:"setFoodItems",
          payload:data
      })
    })
  }

  return (
    <div className="w-full min-h-screen pt-[120px] flex  items-center justify-center">
      <div className="w-[90%] border border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 gap-4 md:w-[70%]">
      {field && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertMsg === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full flex gap-2 p-2 items-center border-b border-gray-300">
          <MdFastfood className="text-textColor text-xl" />
          <input
            type="text"
            name="title"
            value={itemData.title}
            onChange={inputChangeHandler}
            placeholder="Give Me A Title"
            required
            className="w-full h-full border-none outline-none bg-transparent
            text-lg font-semibold placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full">
          <select
            name="categorey"
            onChange={inputChangeHandler}
            className="w-full border-none outline-none p-2 text-base border-b-2 border-gray-200 cursor-pointer rounded-md "
          >
            <option value="select" className="bg-white">
              Select Category
            </option>
            {Category &&
              Category.map((item) => (
                <option
                  key={item.id}
                  value={item.urlParamName}
                  className="text-headingColor text-base outline-none border-0 capatilize bg-white"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>


        <div
          className="w-full h-225 md:h-420 flex flex-col items-center
        justify-center rounded-lg border-2 border-dotted border-gray-300 cursor-pointer"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
                      <MdCloudUpload className="text-3xl  text-gray-500 hover:text-gray-700" />
                      <p className="text-base text-gray-500 hover:text-gray-700 ">
                        Click Here To Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded-img"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute bottom-3 right-3 p-3 rounded-full 
                     bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md
                      duration-500 transition-all ease-in-out"
                      onClick={deletImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full md:flex-row flex flex-col items-center  gap-3">
          <div className="flex w-full items-center gap-2 py-2 border-b border-gray-400">
            <MdFoodBank className="text-2xl text-textColor" />
            <input
              type="text"
              name="calories"
              value={itemData.calories}
              onChange={inputChangeHandler}
              placeholder="Calories"
              className="w-full h-full border-none outline-none bg-transparent
            text-lg font-semibold placeholder:text-gray-400 text-textColor"
            />
          </div>
          <div className="flex w-full items-center gap-2 py-2 border-b border-gray-400">
            <MdAttachMoney className="text-2xl text-textColor" />
            <input
              type="text"
              name="price"
              value={itemData.price}
              onChange={inputChangeHandler}
              placeholder="Price"
              className="w-full h-full border-none outline-none bg-transparent
            text-lg font-semibold placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="w-full flex items-center">
          <button
            className="w-full md:w-auto ml-0 md:ml-auto bg-emerald-500
          border-none outline-none px-12 py-2 rounded-lg text-lg 
          text-white font-semibold"
          onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
