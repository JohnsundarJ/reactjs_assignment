const initialState = {
    loading: false,
    message:"" ,
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "RESOURCE_PENDING":
        return {
          loading: true,
          
        };
  
      case "RESOURCE_SUCCESS":
        return {
          ...state,
          loading: false,
          message: action.payload,
          error: "",
        };
  
      case "RESOURCE_FAILURE":
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
  