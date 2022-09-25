


const inintial_state = {
    foodItems : []
}

const foodItemReducer = (state = inintial_state,action) => {
 
   switch (action.type) {
    case "setFoodItems":

        state = {
            ...state,
            foodItems:action.payload
        }
      
       break ; 

   

   }
   
   return state
}

export default foodItemReducer;