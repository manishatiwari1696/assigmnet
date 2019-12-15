import axios from "axios";
import { toastr } from 'react-redux-toastr'
import url from "../config";
import {
    LOGIN_USER_DETAILS,
    USER_NOTES
} from "../constants/constants";

export function userLoginDetails(data) {
    return {
        type: LOGIN_USER_DETAILS,
        Payload: data
    };
}

export function userNotes(userNotes) {
    return {
        type: USER_NOTES,
        Payload: userNotes
    };
}

export function removeLoggedInUserData() {
    return function (dispatch) {
        dispatch(userLoginDetails());
        return true;
    };
}

export function registerUser(data) {
    var headers = {
        "content-type": "application/json"
    };
    return axios
        .post(url + "/user/createUser", { data })
        .then(res => {
            if (res.data.status === 200) {
                toastr.success(res.data.msg);
                return true;
            } else toastr.error(res.data.msg);
        })
        .catch(err => {
            toastr.error("Something went wrong, Please try again");
        });
}


export function logginUser(data) {
    return axios
        .post(url + "/user/login", { data })
        .then(res => {
            if (res.data.status === 200) {
                toastr.success("Welcome");
                localStorage.setItem("token", res.data.token);
                return true;
            } else toastr.error(res.data.msg);
        })
        .catch(err => {
            toastr.error("Something went wrong, Please try again");
        });
}

export function getlogginUserdetails() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
    );
    var headers = {
        "content-type": "application/json"
    };
    return function (dispatch) {
        return axios
            .post(url + "/user/LoggedInUserDetails", { headers: headers })
            .then(res => {
                if (res.data.status === 200) {
                    dispatch(userLoginDetails(res.data.data));
                    return true;
                } else toastr.error(res.data.msg);
            })
            .catch(err => {
                toastr.error("Something went wrong, Please try again");
            });
    };
}


export function createNotes(data) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
    );
    var headers = {
        "content-type": "application/json"
    };
    return function (dispatch) {
        return axios
            .post(url + "/user/createNotes", { data }, { headers: headers })
            .then(res => {
                if (res.data.status === 200) {
                    dispatch(userNotes(res.data.data));
                    return true;
                } else toastr.error(res.data.msg);
            })
            .catch(err => {
                toastr.error("Something went wrong, Please try again");
            });
    };
}

export function editNotesApi(editData, editId) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
    );
    var headers = {
        "content-type": "application/json"
    };
    return function (dispatch) {
        return axios
            .post(url + "/user/editNotes", { editData, editId }, { headers: headers })
            .then(res => {
                if (res.data.status === 200) {
                    dispatch(userNotes(res.data.data));
                    return true;
                } else toastr.error(res.data.msg);
            })
            .catch(err => {
                toastr.error("Something went wrong, Please try again");
            });
    };
}

export function deleteNote(editData, editId) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
    );
    var headers = {
        "content-type": "application/json"
    };
    return function (dispatch) {
        return axios
            .post(url + "/user/deleteNote", { editId }, { headers: headers })
            .then(res => {
                if (res.data.status === 200) {
                    dispatch(userNotes(res.data.data));
                    return true;
                } else toastr.error(res.data.msg);
            })
            .catch(err => {
                toastr.error("Something went wrong, Please try again");
            });
    };
}


