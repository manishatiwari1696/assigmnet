import {
    LOGIN_USER_DETAILS,
    USER_NOTES
} from "../constants/constants";
const initialState = [];
export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_DETAILS:
            return {
                loggedInUser: action.Payload,
                state: { ...state }
            };

        case USER_NOTES:
            return {
                userNotes: action.Payload,
                state: { ...state }
            };

        default:
            return { ...state };
    }
}