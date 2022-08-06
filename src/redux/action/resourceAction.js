import axios from "axios";
import { resource } from "../../api";
import { createBrowserHistory } from "history";
export const browserHistory = createBrowserHistory();

export const resourcePending = () => {
  return {
    type: "RESOURCE_PENDING",
  };
};

const resourceSuccess = (message) => {
  return {
    type: "RESOURCE_SUCCESS",
    payload: message,
  };
};

const resourceFailure = (error) => {
  return {
    type: "RESOURCE_FAILURE",
    payload: error,
  };
};

export const getResource = () => {
  return  (dispatch) => {
    dispatch(resourcePending());
    return axios
      .get(`${resource}`)
        .then((res) => {
        if(res.data.status===200)
        dispatch(resourceSuccess(res.data.data))
        else{
            dispatch(resourceFailure(res.data.message));        
        }
          return res;
      })
      .catch((err) => {
        dispatch(resourceFailure(err));
      });
  };
};
