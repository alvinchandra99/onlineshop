import { combineReducers } from "redux";

import shoppingReducer from "../reduxMul/Shopping/shopping-reducer";

const rootReducer = combineReducers({
  shop: shoppingReducer,
});

export default rootReducer;
