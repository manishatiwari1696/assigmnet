import { combineReducers } from "redux";
import user from "./userReducer"
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
    toastr: toastrReducer,
    user
});
export default rootReducer;