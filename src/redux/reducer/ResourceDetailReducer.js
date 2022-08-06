const initialState = {
    loading: false,
    message:"" ,
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "RESOURCEDETAIL_PENDING":
        return {
          loading: true,
          
        };
  
      case "RESOURCEDETAIL_SUCCESS":
        return {
          ...state,
          loading: false,
          message: action.payload,
          error: "",
        };
  
      case "RESOURCEDETAIL_FAILURE":
        return {
          ...state,
          loading: false,
          message: "",
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  