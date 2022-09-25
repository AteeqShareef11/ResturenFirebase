

const inintial_state = {
    showCart : false
}





const cartReducer = (state = inintial_state,action) => {
    switch (action.type) {
        case "showCart":
            state = {
                ...state,
                showCart:action.payload
            }
            
     

    
    }
    return state;
}

export default cartReducer;