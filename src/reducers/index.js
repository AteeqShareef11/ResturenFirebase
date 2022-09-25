import { combineReducers } from "redux";
import userReducer from "./userReducer";
import foodItemReducer from './foodItemReducer';
import cartReducer from './cartReducer';
import cartItemsReducer from './cartItemsReducer';


const rootReducer = combineReducers({
    userReducer,
    foodItemReducer,
    cartReducer,
    cartItemsReducer
})

export default rootReducer