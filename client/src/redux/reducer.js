let initialState = {
   dogsLoaded: [],
   dogsloadedByQuery: [],
   dogDetails: {}
  };
   
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_DOGS":
      return {
        ...state, 
        dogsLoaded : action.payload
      }
        case "GET_DOGS_BY_QUERY":
            return {
                ...state,
                dogsloadedByQuery: action.payload
            }
        case "GET_DETAILS":
            return {
                ...state,
                dogDetails: action.payload
            }
      default: return state;
    }
  }