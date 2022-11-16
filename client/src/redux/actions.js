import axios from 'axios';
var numRam= Math.random() * (Math.random() * 4044440)
var id= Math.floor(numRam)


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

  export function getDogDetails(breedId) {
    return function(dispatch) {
      return fetch(`http://localhost:3001/dogs/${breedId}`)
        .then(response => response.json())
        .then(res => {
          dispatch({ type: "GET_DETAILS" ,payload: res });
        });
    };
  }

  export function getTemperaments() {
    return function(dispatch) {
      return fetch(`http://localhost:3001/temperaments`)
        .then(response => response.json())
        .then(res => {
          dispatch({ type: "GET_TEMPERAMENTS" ,payload: res });
        });
    };
  }

  export function createDog(input) {
    return function(dispatch) {
      return axios.post("http://localhost:3001/dogs/creation",{
        ...input,
        id: id = id + 1
        })
        .then(res => {
          dispatch({ type:"CREATE_DOG" ,payload: res.data });
        });
    };
  }