let initialState = {
   dogsLoaded: []
  };
   
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_DOGS":
      return {
        ...state, 
        dogsLoaded : action.payload
      }
      case "GET_MOVIES":
        return {
            ...state,
            moviesLoaded: action.payload.Search
        }
        case "REMOVE_MOVIE_FAVORITE":
            return {
                ...state,
                moviesFavorites: state.moviesFavorites.filter(e => 
                    e.id !== action.payload )
            }
        case "GET_MOVIE_DETAIL":
            return {
                ...state,
                movieDetail: action.payload
            }
      default: return state;
    }
  }