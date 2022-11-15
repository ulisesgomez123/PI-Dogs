let initialState = {
   dogsLoaded: [],
   dogsloadedByQuery: [],
   dogDetails: [],
   temperaments: [],
   createdDogs: [],
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
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }
            case 'CREATE_DOG':
              return {
                  ...state,
                  createdDogs: [...state.createdDogs,action.payload]
              }
      default: return state;
    }
  }