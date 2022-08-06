import axios from "axios";
import { resource } from "../../api";
import { createBrowserHistory } from "history";
export const browserHistory = createBrowserHistory();

export const resourceDetailPending = () => {
  return {
    type: "RESOURCEDETAIL_PENDING",
  };
};

const resourceDetailSuccess = (message) => {
  return {
    type: "RESOURCEDETAIL_SUCCESS",
    payload: message,
  };
};

const resourceDetailFailure = (error) => {
  return {
    type: "RESOURCEDETAIL_FAILURE",
    payload: error,
  };
};

export const getResourceDetail = (id) => {
  return  (dispatch) => {
    dispatch(resourceDetailPending());
    return axios
      .get(`https://media-content.ccbp.in/website/react-assignment/resource/${id}.json`)
        .then((res) => {
        if(res.data.status===200)
        dispatch(resourceDetailSuccess(res.data.data))
        else{
            dispatch(resourceDetailFailure(res.data.message));        
        }
          return res;
      })
      .catch((err) => {
        dispatch(resourceDetailFailure(err));
      });
  };
};
