export function getDogs() {
    return function(dispatch) {
      return fetch(`http://localhost:3001/dogs`)
        .then(response => response.json())
        .then(res => {
          dispatch({ type: "GET_DOGS" ,payload: res });
        });
    };
  }