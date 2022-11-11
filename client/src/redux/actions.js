export function getDogs() {
    return function(dispatch) {
      return fetch(`http://localhost:3001/dogs`)
        .then(response => response.json())
        .then(res => {
          dispatch({ type: "GET_DOGS" ,payload: res });
        });
    };
  }

  export function getDogsByQuery(query) {
    return function(dispatch) {
      return fetch(`http://localhost:3001/dogs?name=${query}`)
        .then(response => response.json())
        .then(res => {
          dispatch({ type: "GET_DOGS_BY_QUERY" ,payload: res });
        });
    };
  }

  export function getDetails(breedId) {
    return function(dispatch) {
      return fetch(`http://localhost:3001/${breedId}`)
        .then(response => response.json())
        .then(res => {
          dispatch({ type: "GET_DETAILS" ,payload: res });
        });
    };
  }