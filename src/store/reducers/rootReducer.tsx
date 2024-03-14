import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer
});

export default rootReducer;
